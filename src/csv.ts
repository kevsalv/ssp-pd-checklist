/**
 * Parse a Notion-export style CSV and build a roadmap-shaped structure + checked map.
 */

import type { RoadmapMonth, RoadmapWeek, RoadmapDay, RoadmapTask } from './types';
import { MONTH_COLORS } from './types';
import { parseTimeToMinutes } from './time';

const DAY_NAME_TO_ABBR: Record<string, string> = {
  Monday: 'MON',
  Tuesday: 'TUE',
  Wednesday: 'WED',
  Thursday: 'THU',
  Friday: 'FRI',
  Saturday: 'SAT',
  Sunday: 'SUN',
};

const DAY_TYPE_MAP: Record<string, 'wfh' | 'office' | 'weekend'> = {
  wfh: 'wfh',
  WFH: 'wfh',
  office: 'office',
  OFFICE: 'office',
  weekend: 'weekend',
  Weekend: 'weekend',
};

const COMPLETED_STATUSES = ['done', 'complete', 'completed'];

function parseCSVRows(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ',') {
      current.push(field.trim());
      field = '';
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      current.push(field.trim());
      field = '';
      if (current.some((c) => c.length > 0)) rows.push(current);
      current = [];
      continue;
    }
    field += ch;
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field.trim());
    if (current.some((c) => c.length > 0)) rows.push(current);
  }
  return rows;
}

function getColumnIndex(header: string[], name: string): number {
  const i = header.findIndex((h) => h.trim().toLowerCase() === name.toLowerCase());
  return i >= 0 ? i : -1;
}

function parseMonthIndex(s: string): number {
  const m = s.match(/Month\s*(\d+)/i) || s.match(/(\d+)/);
  return m ? Math.max(0, parseInt(m[1], 10) - 1) : -1;
}

function parseWeekIndex(s: string): number {
  const m = s.match(/Week\s*(\d+)/i) || s.match(/(\d+)/);
  return m ? Math.max(0, parseInt(m[1], 10) - 1) : -1;
}

export interface CsvTaskRow {
  name: string;
  status: string;
  monthIndex: number;
  weekIndex: number;
  dayAbbr: string;
  dayType: 'wfh' | 'office' | 'weekend';
  duration: string;
  details: string;
  reference: string;
  url: string;
  taskType: string;
  tag: string;
  isMilestone: boolean;
  phase: string;
}

export interface ParseResult {
  roadmap: RoadmapMonth[];
  checked: Record<string, boolean>;
  taskCount: number;
  completedCount: number;
}

export function parseChecklistCsv(csvText: string): ParseResult {
  const rows = parseCSVRows(csvText);
  if (rows.length < 2) {
    throw new Error('Invalid CSV or no data rows');
  }

  const header = rows[0];
  const nameI = getColumnIndex(header, 'Name');
  const statusI = getColumnIndex(header, 'Status');
  const monthI = getColumnIndex(header, 'Month');
  const weekI = getColumnIndex(header, 'Week');
  const dayI = getColumnIndex(header, 'Day');
  const dayTypeI = getColumnIndex(header, 'Day Type');
  const durationI = getColumnIndex(header, 'Duration');
  const detailsI = getColumnIndex(header, 'Details');
  const refI = getColumnIndex(header, 'Reference');
  const urlI = getColumnIndex(header, 'URL');
  const phaseI = getColumnIndex(header, 'Phase');
  const taskTypeI = getColumnIndex(header, 'Task Type');
  const tagI = getColumnIndex(header, 'Tag');
  const isMilestoneI = getColumnIndex(header, 'Is Milestone');

  if (nameI < 0 || monthI < 0 || weekI < 0 || dayI < 0) {
    throw new Error('Invalid CSV: missing required columns (Name, Month, Week, Day)');
  }

  const taskRows: CsvTaskRow[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = (row[nameI] ?? '').trim();
    if (!name) continue;

    const monthIndex = parseMonthIndex(row[monthI] ?? '');
    const weekIndex = parseWeekIndex(row[weekI] ?? '');
    const dayName = (row[dayI] ?? '').trim();
    const dayAbbr = DAY_NAME_TO_ABBR[dayName] ?? (dayName.slice(0, 3).toUpperCase() || 'MON');
    const dayTypeRaw = (row[dayTypeI] ?? 'wfh').trim();
    const dayType = DAY_TYPE_MAP[dayTypeRaw] ?? 'wfh';

    if (monthIndex < 0 || weekIndex < 0) continue;

    const isMilestoneRaw = (isMilestoneI >= 0 ? row[isMilestoneI] : '') ?? '';
    const isMilestone = /^(1|yes|true|x)$/i.test(String(isMilestoneRaw).trim());

    taskRows.push({
      name,
      status: (row[statusI] ?? '').trim(),
      monthIndex,
      weekIndex,
      dayAbbr,
      dayType,
      duration: (row[durationI] ?? '').trim() || '0m',
      details: (row[detailsI] ?? '').trim(),
      reference: (row[refI] ?? '').trim(),
      url: (row[urlI] ?? '').trim(),
      phase: (row[phaseI] ?? '').trim(),
      taskType: taskTypeI >= 0 ? (row[taskTypeI] ?? '').trim() : '',
      tag: tagI >= 0 ? (row[tagI] ?? '').trim() : '',
      isMilestone: isMilestoneI >= 0 ? isMilestone : false,
    });
  }

  if (taskRows.length === 0) {
    throw new Error('No tasks found in CSV');
  }

  const checked: Record<string, boolean> = {};
  const completedStatuses = new Set(COMPLETED_STATUSES.map((s) => s.toLowerCase()));

  const key = (mi: number, wi: number, day: string, taskIndex: number) =>
    `m${mi + 1}w${wi + 1}-${day.toLowerCase()}-${taskIndex + 1}`;

  const monthMap = new Map<
    number,
    Map<
      number,
      Map<string, { tasks: RoadmapTask[]; dayType: 'wfh' | 'office' | 'weekend' }>>
  >();

  for (const tr of taskRows) {
    const { monthIndex: mi, weekIndex: wi, dayAbbr, dayType } = tr;
    if (!monthMap.has(mi)) {
      monthMap.set(mi, new Map());
    }
    const weekMap = monthMap.get(mi)!;
    if (!weekMap.has(wi)) {
      weekMap.set(wi, new Map());
    }
    const dayMap = weekMap.get(wi)!;
    if (!dayMap.has(dayAbbr)) {
      dayMap.set(dayAbbr, { tasks: [], dayType });
    }
    const dayGroup = dayMap.get(dayAbbr)!;
    const taskIndex = dayGroup.tasks.length;
    const id = key(mi, wi, dayAbbr, taskIndex);
    const durationMinutes = Math.max(1, parseTimeToMinutes(tr.duration) || 30);
    dayGroup.tasks.push({
      id,
      time: String(durationMinutes),
      text: tr.name,
      detail: tr.details,
      ref: tr.reference,
      url: tr.url,
      ...(tr.taskType ? { taskType: tr.taskType } : {}),
      ...(tr.tag ? { tag: tr.tag } : {}),
      ...(tr.isMilestone ? { isMilestone: true } : {}),
      ...(tr.phase ? { phase: tr.phase } : {}),
    });
    if (completedStatuses.has(tr.status.toLowerCase())) {
      checked[id] = true;
    }
  }

  const dayOrder = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const roadmap: RoadmapMonth[] = [];

  const sortedMonths = Array.from(monthMap.keys()).sort((a, b) => a - b);
  for (const mi of sortedMonths) {
    const weekMap = monthMap.get(mi)!;
    const sortedWeeks = Array.from(weekMap.keys()).sort((a, b) => a - b);
    const weeks: RoadmapWeek[] = [];
    let firstPhase = '';

    for (const wi of sortedWeeks) {
      const dayMap = weekMap.get(wi)!;
      const days: RoadmapDay[] = [];
      const sortedDays = Array.from(dayMap.keys()).sort(
        (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
      );
      let weekTheme = '';
      for (const dayAbbr of sortedDays) {
        const { tasks, dayType } = dayMap.get(dayAbbr)!;
        days.push({ day: dayAbbr, type: dayType, tasks });
        if (!weekTheme && tasks[0]) {
          const row = taskRows.find((t) => t.name === tasks[0].text);
          if (row?.phase) weekTheme = row.phase;
        }
      }
      if (!firstPhase && weekTheme) firstPhase = weekTheme;
      weeks.push({
        id: `m${mi + 1}w${wi + 1}`,
        label: `Week ${wi + 1}`,
        theme: weekTheme || firstPhase || `Week ${wi + 1}`,
        days,
      });
    }

    const phaseForMonth =
      taskRows.find((t) => t.monthIndex === mi)?.phase || `Phase ${mi + 1}`;
    roadmap.push({
      id: mi + 1,
      label: `Month ${mi + 1}`,
      title: phaseForMonth,
      subtitle: `${weeks.length} weeks`,
      color: MONTH_COLORS[mi % MONTH_COLORS.length] ?? MONTH_COLORS[0],
      weeks,
    });
  }

  const taskCount = taskRows.length;
  const completedCount = Object.keys(checked).length;

  return { roadmap, checked, taskCount, completedCount };
}

const DAY_ABBR_TO_NAME: Record<string, string> = {
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
  SUN: 'Sunday',
};

function escapeCsvField(val: string): string {
  const s = String(val ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

/**
 * Build a CSV string from roadmap + checked so it can be re-imported.
 * Column order matches what parseChecklistCsv expects.
 */
export function buildRoadmapCsv(
  roadmap: RoadmapMonth[],
  checked: Record<string, boolean>
): string {
  const header = [
    'Name',
    'Status',
    'Month',
    'Week',
    'Day',
    'Day Type',
    'Duration',
    'Details',
    'Reference',
    'URL',
    'Phase',
    'Task Type',
    'Tag',
    'Is Milestone',
  ];
  const rows: string[][] = [header.map(escapeCsvField)];

  for (let mi = 0; mi < roadmap.length; mi++) {
    const month = roadmap[mi];
    for (let wi = 0; wi < month.weeks.length; wi++) {
      const week = month.weeks[wi];
      for (let di = 0; di < week.days.length; di++) {
        const day = week.days[di];
        for (let ti = 0; ti < day.tasks.length; ti++) {
          const t = day.tasks[ti];
          const minutes = parseTimeToMinutes(t.time) || 0;
          const duration = minutes ? `${minutes}m` : '0m';
          const dayName = DAY_ABBR_TO_NAME[day.day] ?? day.day;
          const status = checked[t.id] ? 'Done' : '';
          const isMilestone = t.isMilestone ? 'Yes' : 'No';
          rows.push([
            t.text,
            status,
            `Month ${mi + 1}`,
            `Week ${wi + 1}`,
            dayName,
            day.type,
            duration,
            t.detail ?? '',
            t.ref ?? '',
            t.url ?? '',
            t.phase ?? '',
            t.taskType ?? '',
            t.tag ?? '',
            isMilestone,
          ].map(escapeCsvField));
        }
      }
    }
  }

  return rows.map((row) => row.join(',')).join('\r\n');
}
