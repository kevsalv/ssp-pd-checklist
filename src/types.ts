const ORANGE = '#E8892B';
const GREEN = '#4CAF7D';
const BLUE = '#64B5F6';

export interface RoadmapTask {
  id: string;
  time: string;
  text: string;
  detail: string;
  ref: string;
  url: string;
  /** Task Type (e.g. from CSV) */
  taskType?: string;
  /** Tag (e.g. from CSV) */
  tag?: string;
  /** Is Milestone (e.g. from CSV) */
  isMilestone?: boolean;
  /** Phase (e.g. from CSV; can also be at week level as theme) */
  phase?: string;
}

export type DayType = 'wfh' | 'office' | 'weekend';

export interface RoadmapDay {
  day: string;
  type: DayType;
  tasks: RoadmapTask[];
}

export interface RoadmapWeek {
  id: string;
  label: string;
  theme: string;
  days: RoadmapDay[];
}

export interface RoadmapMonth {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  weeks: RoadmapWeek[];
  yearMonth?: string;
}

export const DAY_COLORS: Record<
  DayType,
  { bg: string; border: string; badge: string; label: string }
> = {
  office: { bg: '#1a1a1a', border: ORANGE, badge: ORANGE, label: 'OFFICE' },
  wfh: { bg: '#111', border: GREEN, badge: GREEN, label: 'WFH' },
  weekend: { bg: '#111', border: BLUE, badge: BLUE, label: 'WEEKEND' },
};

export const DAY_ORDER = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
export type WeekdayKey = (typeof DAY_ORDER)[number];

/** User-defined mapping: which weekday (MON–SUN) is wfh, office, or weekend */
export type WeekdayDayTypeMap = Partial<Record<WeekdayKey, DayType>>;

export const DEFAULT_WEEKDAY_DAY_TYPE: Record<WeekdayKey, DayType> = {
  MON: 'wfh',
  TUE: 'office',
  WED: 'wfh',
  THU: 'office',
  FRI: 'office',
  SAT: 'weekend',
  SUN: 'weekend',
};

function createEmptyDay(day: string, type: DayType): RoadmapDay {
  return { day, type, tasks: [] };
}

function createSeedWeek(weekIndex: number, weekdayDayType?: WeekdayDayTypeMap): RoadmapWeek {
  const map = weekdayDayType && Object.keys(weekdayDayType).length > 0
    ? { ...DEFAULT_WEEKDAY_DAY_TYPE, ...weekdayDayType }
    : DEFAULT_WEEKDAY_DAY_TYPE;
  const days: RoadmapDay[] = DAY_ORDER.map((day) =>
    createEmptyDay(day, map[day] ?? 'office')
  );
  return {
    id: `m1w${weekIndex + 1}`,
    label: `Week ${weekIndex + 1}`,
    theme: 'Get started',
    days,
  };
}

export function createSeedRoadmap(weekdayDayType?: WeekdayDayTypeMap): RoadmapMonth[] {
  return [
    {
      id: 1,
      label: 'Month 1',
      title: 'My Roadmap',
      subtitle: 'Add weeks and tasks',
      color: ORANGE,
      weeks: [createSeedWeek(0, weekdayDayType)],
    },
  ];
}

export const MONTH_COLORS = [ORANGE, '#CE93D8', BLUE, GREEN, '#81C784', '#EF9A9A'] as const;

export function getDayTypeFromDate(date: Date, weekdayDayType?: WeekdayDayTypeMap): DayType {
  const dayAbbr = getDayAbbrFromDate(date) as WeekdayKey;
  if (weekdayDayType && weekdayDayType[dayAbbr]) return weekdayDayType[dayAbbr];
  const day = date.getDay();
  return day === 0 || day === 6 ? 'weekend' : 'office';
}

export function getDayAbbrFromDate(date: Date): string {
  return DAY_ORDER[date.getDay() === 0 ? 6 : date.getDay() - 1];
}

export function getWeekInMonth(date: Date): number {
  return Math.ceil(date.getDate() / 7);
}

export function getYearMonth(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function formatMonthLabel(yearMonth: string): string {
  const [y, m] = yearMonth.split('-').map(Number);
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${names[m - 1]} ${y}`;
}

function createWeekWithDays(weekNum: number, monthId: number, weekdayDayType?: WeekdayDayTypeMap): RoadmapWeek {
  const map = weekdayDayType && Object.keys(weekdayDayType).length > 0
    ? { ...DEFAULT_WEEKDAY_DAY_TYPE, ...weekdayDayType }
    : DEFAULT_WEEKDAY_DAY_TYPE;
  const days: RoadmapDay[] = DAY_ORDER.map((day) =>
    createEmptyDay(day, map[day] ?? 'office')
  );
  return {
    id: `m${monthId}w${weekNum}`,
    label: `Week ${weekNum}`,
    theme: '',
    days,
  };
}

export function ensureMonthWeekDayForDate(
  roadmap: RoadmapMonth[],
  date: Date,
  weekdayDayType?: WeekdayDayTypeMap
): { roadmap: RoadmapMonth[]; monthIndex: number; weekIndex: number; dayIndex: number } {
  const yearMonth = getYearMonth(date);
  const weekInMonth = getWeekInMonth(date);
  const dayAbbr = getDayAbbrFromDate(date);
  const dayOrder = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dayIndex = dayOrder.indexOf(dayAbbr);
  if (dayIndex < 0) throw new Error(`Unknown day ${dayAbbr}`);

  let monthIndex = roadmap.findIndex((m) => m.yearMonth === yearMonth);
  let updated = [...roadmap];

  if (monthIndex < 0) {
    const newId = updated.length + 1;
    const newMonth: RoadmapMonth = {
      id: newId,
      label: formatMonthLabel(yearMonth),
      title: formatMonthLabel(yearMonth),
      subtitle: '',
      color: MONTH_COLORS[(newId - 1) % MONTH_COLORS.length],
      yearMonth,
      weeks: [createWeekWithDays(1, newId, weekdayDayType)],
    };
    const insertAt = updated.findIndex((m) => (m.yearMonth ?? '') > yearMonth);
    if (insertAt < 0) {
      updated.push(newMonth);
      monthIndex = updated.length - 1;
    } else {
      updated.splice(insertAt, 0, newMonth);
      monthIndex = insertAt;
    }
  }

  const month = updated[monthIndex];
  let weekIndex = month.weeks.findIndex((w) => w.label === `Week ${weekInMonth}`);
  if (weekIndex < 0) {
    const newWeek = createWeekWithDays(weekInMonth, month.id, weekdayDayType);
    const newWeeks = [...month.weeks, newWeek].sort(
      (a, b) => parseInt(a.label.replace(/\D/g, ''), 10) - parseInt(b.label.replace(/\D/g, ''), 10)
    );
    weekIndex = newWeeks.indexOf(newWeek);
    updated = updated.map((m, i) =>
      i === monthIndex ? { ...m, weeks: newWeeks } : m
    );
  }

  const week = updated[monthIndex].weeks[weekIndex];
  const foundDay = week.days.findIndex((d) => d.day === dayAbbr);
  const targetDayIndex = foundDay >= 0 ? foundDay : dayIndex;

  return {
    roadmap: updated,
    monthIndex,
    weekIndex,
    dayIndex: targetDayIndex,
  };
}
