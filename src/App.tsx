import { useState, useEffect, useCallback, useRef } from 'react';
import {
  DAY_COLORS,
  DAY_ORDER,
  createSeedRoadmap,
  ensureMonthWeekDayForDate,
  getDayAbbrFromDate,
  getDayTypeFromDate,
  getWeekInMonth,
  getYearMonth,
  formatMonthLabel,
} from './types';
import type { RoadmapMonth, RoadmapWeek, RoadmapDay, RoadmapTask, DayType } from './types';
import * as db from './db';
import type { WeekSettings } from './db';
import { DEFAULT_WEEK_SETTINGS, getSettings, setSettings } from './db';
import { parseChecklistCsv, buildRoadmapCsv } from './csv';
import { parseTimeToMinutes, formatMinutes } from './time';
import { IoSunnyOutline, IoMoonOutline, IoAddOutline, IoRefreshOutline, IoSettingsOutline, IoCreateOutline, IoTrashOutline, IoCheckmark, IoClose } from 'react-icons/io5';
import { AiOutlineExport, AiOutlineImport } from 'react-icons/ai';

const THEME_STORAGE_KEY = 'pd-checklist-theme';
type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'dark';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  const resolved: Theme =
    stored === 'light' || stored === 'dark' ? stored : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  if (typeof document !== 'undefined') document.body.setAttribute('data-theme', resolved);
  return resolved;
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [roadmap, setRoadmap] = useState<RoadmapMonth[]>([]);
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [importPreview, setImportPreview] = useState<{
    roadmap: RoadmapMonth[];
    checked: Record<string, boolean>;
    taskCount: number;
    completedCount: number;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [addTaskForm, setAddTaskForm] = useState({
    taskDate: new Date().toISOString().slice(0, 10),
    text: '',
    time: '30',
    detail: '',
    ref: '',
    url: '',
    taskType: '',
    tag: '',
    isMilestone: false,
    phase: '',
  });
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskForm, setEditTaskForm] = useState({
    text: '',
    time: '30',
    detail: '',
    ref: '',
    url: '',
    taskType: '',
    tag: '',
    isMilestone: false,
    phase: '',
  });
  const [weekSettings, setWeekSettings] = useState<WeekSettings>(DEFAULT_WEEK_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState<WeekSettings>(DEFAULT_WEEK_SETTINGS);
  const lastViewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!addTaskOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAddTaskOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [addTaskOpen]);

  useEffect(() => {
    if (!editTaskId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEditTaskId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editTaskId]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSettingsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [settingsOpen]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    setActiveMonth((m) => Math.min(m, Math.max(0, roadmap.length - 1)));
  }, [roadmap.length]);

  const monthForClamp = roadmap[activeMonth];
  useEffect(() => {
    if (!monthForClamp) return;
    const weekCount = monthForClamp.weeks.length;
    const weekMax = Math.max(0, weekCount - 1);
    setActiveWeek((w) => (w > weekMax ? weekMax : w));
  }, [monthForClamp]);
  useEffect(() => {
    const week = monthForClamp?.weeks[activeWeek];
    if (!week) return;
    const dayMax = Math.max(0, week.days.length - 1);
    setActiveDay((d) => (d > dayMax ? dayMax : d));
  }, [monthForClamp, activeWeek]);

  useEffect(() => {
    const load = async () => {
      try {
        let checkedData = await db.getChecked();
        if (Object.keys(checkedData).length === 0 && window.storage) {
          try {
            const r = await window.storage.get('pd-checklist-checked');
            if (r?.value) {
              checkedData = JSON.parse(r.value) as Record<string, boolean>;
              await db.setChecked(checkedData);
            }
          } catch {
            // ignore migration errors
          }
        }
        setChecked(checkedData);

        const lastView = await db.getLastView();
        if (lastView) {
          setActiveMonth((m) => Math.min(m, Math.max(0, lastView.monthIndex)));
          setActiveWeek((w) => Math.min(w, Math.max(0, lastView.weekIndex)));
          setActiveDay((d) => Math.min(d, Math.max(0, lastView.dayIndex)));
        }

        const customRoadmap = await db.getCustomRoadmap();
        const savedSettings = await getSettings();
        const resolvedSettings = savedSettings ?? DEFAULT_WEEK_SETTINGS;
        setWeekSettings(resolvedSettings);
        if (!customRoadmap || !Array.isArray(customRoadmap) || customRoadmap.length === 0) {
          const seed = createSeedRoadmap(resolvedSettings.weekdayDayType);
          setRoadmap(seed);
          await db.setCustomRoadmap(seed);
        } else {
          setRoadmap(customRoadmap as RoadmapMonth[]);
        }
      } catch {
        // continue with defaults
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  const saveChecked = useCallback((newChecked: Record<string, boolean>) => {
    db.setChecked(newChecked);
  }, []);

  const schedulePersistLastView = useCallback((month: number, week: number, day: number) => {
    if (lastViewTimerRef.current) clearTimeout(lastViewTimerRef.current);
    lastViewTimerRef.current = setTimeout(() => {
      db.setLastView(month, week, day);
      lastViewTimerRef.current = null;
    }, 300);
  }, []);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    saveChecked(next);
  };

  const setActiveMonthAndPersist = useCallback(
    (i: number) => {
      setActiveMonth(i);
      setActiveWeek(0);
      setActiveDay(0);
      schedulePersistLastView(i, 0, 0);
    },
    [schedulePersistLastView]
  );

  const setActiveWeekAndPersist = useCallback(
    (i: number) => {
      setActiveWeek(i);
      setActiveDay(0);
      schedulePersistLastView(activeMonth, i, 0);
    },
    [activeMonth, schedulePersistLastView]
  );

  const setActiveDayAndPersist = useCallback(
    (i: number) => {
      setActiveDay(i);
      schedulePersistLastView(activeMonth, activeWeek, i);
    },
    [activeMonth, activeWeek, schedulePersistLastView]
  );

  const handleAddTaskOpen = useCallback(() => {
    setAddTaskForm({
      taskDate: new Date().toISOString().slice(0, 10),
      text: '',
      time: '30m',
      detail: '',
      ref: '',
      url: '',
      taskType: '',
      tag: '',
      isMilestone: false,
      phase: '',
    });
    setAddTaskOpen(true);
  }, []);

  const handleAddTaskSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const { taskDate, text, time, detail, ref: refVal, url, taskType, tag, isMilestone, phase } = addTaskForm;
      const trimmedText = text.trim();
      if (!trimmedText) return;

      const date = new Date(taskDate + 'T12:00:00');
      const { roadmap: roadmapWithPlace, monthIndex: mi, weekIndex: wi, dayIndex: di } = ensureMonthWeekDayForDate(roadmap, date, weekSettings?.weekdayDayType);
      const targetDay = roadmapWithPlace[mi].weeks[wi].days[di];
      const nextTaskIndex = targetDay.tasks.length + 1;
      const dayAbbr = getDayAbbrFromDate(date);
      const taskId = `m${mi + 1}w${wi + 1}-${dayAbbr.toLowerCase()}-${nextTaskIndex}`;
      const minutes = Math.max(1, parseInt(String(time), 10) || 30);
      const newTask: RoadmapTask = {
        id: taskId,
        time: String(minutes),
        text: trimmedText,
        detail: (detail ?? '').trim(),
        ref: (refVal ?? '').trim() || trimmedText,
        url: (url ?? '').trim(),
        ...(taskType?.trim() ? { taskType: taskType.trim() } : {}),
        ...(tag?.trim() ? { tag: tag.trim() } : {}),
        ...(isMilestone ? { isMilestone: true } : {}),
        ...(phase?.trim() ? { phase: phase.trim() } : {}),
      };

      const updated = roadmapWithPlace.map((m, mIdx) => {
        if (mIdx !== mi) return m;
        return {
          ...m,
          weeks: m.weeks.map((w, wIdx) => {
            if (wIdx !== wi) return w;
            return {
              ...w,
              days: w.days.map((d, dIdx) => {
                if (dIdx !== di) return d;
                return { ...d, tasks: [...d.tasks, newTask] };
              }),
            };
          }),
        };
      });

      setRoadmap(updated);
      db.setCustomRoadmap(updated);
      setActiveMonth(mi);
      setActiveWeek(wi);
      setActiveDay(di);
      schedulePersistLastView(mi, wi, di);
      setAddTaskOpen(false);
      setAddTaskForm({
        taskDate: new Date().toISOString().slice(0, 10),
        text: '',
        time: '30',
        detail: '',
        ref: '',
        url: '',
        taskType: '',
        tag: '',
        isMilestone: false,
        phase: '',
      });
    },
    [addTaskForm, roadmap, schedulePersistLastView]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      if (!window.confirm('Delete this task?')) return;
      let updated: RoadmapMonth[] | null = null;
      for (let mi = 0; mi < roadmap.length; mi++) {
        for (let wi = 0; wi < roadmap[mi].weeks.length; wi++) {
          for (let di = 0; di < roadmap[mi].weeks[wi].days.length; di++) {
            const tasks = roadmap[mi].weeks[wi].days[di].tasks;
            const idx = tasks.findIndex((t) => t.id === taskId);
            if (idx >= 0) {
              updated = roadmap.map((m, mIdx) => {
                if (mIdx !== mi) return m;
                return {
                  ...m,
                  weeks: m.weeks.map((w, wIdx) => {
                    if (wIdx !== wi) return w;
                    return {
                      ...w,
                      days: w.days.map((d, dIdx) => {
                        if (dIdx !== di) return d;
                        return { ...d, tasks: d.tasks.filter((t) => t.id !== taskId) };
                      }),
                    };
                  }),
                };
              });
              break;
            }
          }
          if (updated) break;
        }
        if (updated) break;
      }
      if (updated) {
        setRoadmap(updated);
        db.setCustomRoadmap(updated);
        setChecked((prev) => {
          const next = { ...prev };
          delete next[taskId];
          saveChecked(next);
          return next;
        });
      }
    },
    [roadmap, saveChecked]
  );

  const handleEditTaskOpen = useCallback((task: RoadmapTask) => {
    setEditTaskId(task.id);
    const minutes = parseTimeToMinutes(task.time) || 30;
    setEditTaskForm({
      text: task.text,
      time: String(minutes),
      detail: task.detail || '',
      ref: task.ref || '',
      url: task.url || '',
      taskType: task.taskType || '',
      tag: task.tag || '',
      isMilestone: !!task.isMilestone,
      phase: task.phase || '',
    });
  }, []);

  const handleEditTaskSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!editTaskId) return;
      const { text, time, detail, ref: refVal, url, taskType, tag, isMilestone, phase } = editTaskForm;
      const trimmedText = text.trim();
      if (!trimmedText) return;

      const updated = roadmap.map((m) => ({
        ...m,
        weeks: m.weeks.map((w) => ({
          ...w,
          days: w.days.map((d) => ({
            ...d,
            tasks: d.tasks.map((t) =>
              t.id !== editTaskId
                ? t
                : {
                  ...t,
                  text: trimmedText,
                  time: String(Math.max(1, parseInt(String(time), 10) || 30)),
                  detail: (detail ?? '').trim(),
                  ref: (refVal ?? '').trim() || trimmedText,
                  url: (url ?? '').trim(),
                  taskType: taskType?.trim() || undefined,
                  tag: tag?.trim() || undefined,
                  isMilestone: isMilestone ? true : undefined,
                  phase: phase?.trim() || undefined,
                }
            ),
          })),
        })),
      }));

      setRoadmap(updated);
      db.setCustomRoadmap(updated);
      setEditTaskId(null);
    },
    [editTaskId, editTaskForm, roadmap]
  );

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    setImportError(null);
    setImportPreview(null);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? '');
        const result = parseChecklistCsv(text);
        setImportPreview({
          roadmap: result.roadmap as RoadmapMonth[],
          checked: result.checked,
          taskCount: result.taskCount,
          completedCount: result.completedCount,
        });
      } catch (err) {
        setImportError(err instanceof Error ? err.message : 'Invalid CSV or no tasks found');
      }
    };
    reader.readAsText(file);
  };

  const applyImportAsRoadmap = async () => {
    if (!importPreview) return;
    await db.setCustomRoadmap(importPreview.roadmap);
    await db.setChecked(importPreview.checked);
    setRoadmap(importPreview.roadmap);
    setChecked(importPreview.checked);
    setActiveMonth(0);
    setActiveWeek(0);
    setActiveDay(0);
    setImportPreview(null);
  };

  const applyImportProgressOnly = async () => {
    if (!importPreview) return;
    const merged = { ...checked };
    roadmap.forEach((m) =>
      m.weeks.forEach((w) =>
        w.days.forEach((d) =>
          d.tasks.forEach((t) => {
            if (importPreview.checked[t.id]) merged[t.id] = true;
          })
        )
      )
    );
    setChecked(merged);
    await db.setChecked(merged);
    setImportPreview(null);
  };

  const handleExportCsv = () => {
    if (roadmap.length === 0) return;
    const csv = buildRoadmapCsv(roadmap, checked);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    if (typeof document !== 'undefined') document.body.setAttribute('data-theme', next);
  };

  const month = roadmap[activeMonth];

  if (!loaded) {
    return (
      <div className="loading">
        <span className="loading-text">Loading…</span>
      </div>
    );
  }

  if (!month) {
    return (
      <div className="app" data-theme={theme} style={{ ['--accent']: '#E8892B' } as React.CSSProperties}>
        <header className="header">
          <div className="header-top">
            <span className="header-title">Daily Tracker</span>
            <div className="header-actions">
              <button
                type="button"
                className="import-csv-btn theme-toggle-btn icon-btn"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
              </button>
              <button type="button" className="import-csv-btn icon-btn" onClick={handleAddTaskOpen} title="Add task" aria-label="Add task">
                <IoAddOutline size={18} />
              </button>
              <label className="import-csv-btn icon-btn" title="Import CSV" aria-label="Import CSV">
                <input type="file" accept=".csv" onChange={handleImportFile} className="import-csv-input" />
                <AiOutlineImport size={18} />
              </label>
              {roadmap.length > 0 && (
                <button type="button" className="import-csv-btn icon-btn" onClick={handleExportCsv} title="Export CSV" aria-label="Export CSV">
                  <AiOutlineExport size={18} />
                </button>
              )}
              <button
                type="button"
                className="import-csv-btn header-settings-btn icon-btn"
                onClick={() => {
                  setSettingsForm(weekSettings);
                  setSettingsOpen(true);
                }}
                title="Week settings"
                aria-label="Settings"
              >
                <IoSettingsOutline size={18} />
              </button>
            </div>
          </div>
          {importError && (
            <div className="import-error" role="alert">
              {importError}
              <button type="button" className="import-error-dismiss icon-btn" onClick={() => setImportError(null)} title="Dismiss" aria-label="Dismiss">
                <IoClose size={16} />
              </button>
            </div>
          )}
          {importPreview && (
            <div className="import-preview">
              <p className="import-preview-text">
                {importPreview.taskCount} tasks, {importPreview.completedCount} completed
              </p>
              <div className="import-preview-actions">
                <button type="button" className="import-preview-btn primary" onClick={applyImportAsRoadmap} title="Use as my roadmap">
                  Use as my roadmap
                </button>
                <button type="button" className="import-preview-btn" onClick={applyImportProgressOnly} title="Import progress only">
                  Import progress only
                </button>
                <button type="button" className="import-preview-btn" onClick={() => setImportPreview(null)} title="Cancel">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </header>
        <div className="layout-main">
          <main className="content-main empty-state-main">
            <div className="empty-state">
              <p className="empty-state-title">Your roadmap is empty</p>
              <p className="empty-state-hint">Add a task or import a CSV to get started.</p>
            </div>
          </main>
        </div>

        {addTaskOpen && (
          <div
            className="add-task-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-dialog-title"
            onClick={() => setAddTaskOpen(false)}
          >
            <div className="add-task-dialog" onClick={(e) => e.stopPropagation()}>
              <h2 id="add-task-dialog-title" className="add-task-dialog-title">
                Add task
              </h2>
              <form onSubmit={handleAddTaskSubmit} className="add-task-form">
                <label className="add-task-field">
                  <span className="add-task-label">Date</span>
                  <input
                    type="date"
                    className="add-task-input"
                    value={addTaskForm.taskDate}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, taskDate: e.target.value }))}
                    required
                    autoFocus
                  />
                </label>
                {addTaskForm.taskDate && (() => {
                  const d = new Date(addTaskForm.taskDate + 'T12:00:00');
                  const ym = getYearMonth(d);
                  const weekNum = getWeekInMonth(d);
                  const dayAbbr = getDayAbbrFromDate(d);
                  const dayType = getDayTypeFromDate(d, weekSettings?.weekdayDayType);
                  const dayTypeLabel = dayType === 'weekend' ? 'Weekend' : dayType === 'office' ? 'Office' : 'WFH';
                  return (
                    <div className="add-task-readonly">
                      <div className="add-task-readonly-row"><strong>Month:</strong> {formatMonthLabel(ym)}</div>
                      <div className="add-task-readonly-row"><strong>Week:</strong> {weekNum}</div>
                      <div className="add-task-readonly-row"><strong>Day:</strong> {dayAbbr}</div>
                      <div className="add-task-readonly-row"><strong>Day type:</strong> {dayTypeLabel}</div>
                    </div>
                  );
                })()}
                <div className="add-task-form-row">
                  <label className="add-task-field">
                    <span className="add-task-label">Task title</span>
                    <input
                      type="text"
                      className="add-task-input"
                      value={addTaskForm.text}
                      onChange={(e) => setAddTaskForm((f) => ({ ...f, text: e.target.value }))}
                      placeholder="e.g. Watch Task 1 – Introduction"
                      required
                    />
                  </label>
                  <label className="add-task-field">
                    <span className="add-task-label">Duration (minutes)</span>
                    <input
                      type="number"
                      min={1}
                      className="add-task-input"
                      value={addTaskForm.time}
                      onChange={(e) => setAddTaskForm((f) => ({ ...f, time: e.target.value }))}
                      placeholder="e.g. 30"
                    />
                  </label>
                </div>
                <label className="add-task-field">
                  <span className="add-task-label">Details (optional)</span>
                  <textarea
                    className="add-task-input add-task-textarea"
                    value={addTaskForm.detail}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, detail: e.target.value }))}
                    placeholder="Short description"
                    rows={2}
                  />
                </label>
                <div className="add-task-form-row">
                  <label className="add-task-field">
                    <span className="add-task-label">Reference label (optional)</span>
                    <input
                      type="text"
                      className="add-task-input"
                      value={addTaskForm.ref}
                      onChange={(e) => setAddTaskForm((f) => ({ ...f, ref: e.target.value }))}
                      placeholder="e.g. Your Course: Task 1"
                    />
                  </label>
                  <label className="add-task-field">
                    <span className="add-task-label">URL (optional)</span>
                    <input
                      type="url"
                      className="add-task-input"
                      value={addTaskForm.url}
                      onChange={(e) => setAddTaskForm((f) => ({ ...f, url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </label>
                </div>
                <div className="add-task-form-row">
                  <label className="add-task-field">
                    <span className="add-task-label">Task Type (optional)</span>
                    <input
                      type="text"
                      className="add-task-input"
                      value={addTaskForm.taskType}
                      onChange={(e) => setAddTaskForm((f) => ({ ...f, taskType: e.target.value }))}
                      placeholder="e.g. Lecture, Practice"
                    />
                  </label>
                  <label className="add-task-field">
                    <span className="add-task-label">Tag (optional)</span>
                    <input
                      type="text"
                      className="add-task-input"
                      value={addTaskForm.tag}
                      onChange={(e) => setAddTaskForm((f) => ({ ...f, tag: e.target.value }))}
                      placeholder="e.g. Research, Figma"
                    />
                  </label>
                </div>
                <div className="add-task-form-row">
                  <div className="add-task-field">
                    <span className="add-task-label">Is Milestone</span>
                    <div className="add-task-badge-group" role="group" aria-label="Is Milestone">
                      <button
                        type="button"
                        className={`add-task-badge-option${addTaskForm.isMilestone ? ' selected' : ''}`}
                        onClick={() => setAddTaskForm((f) => ({ ...f, isMilestone: true }))}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`add-task-badge-option${!addTaskForm.isMilestone ? ' selected' : ''}`}
                        onClick={() => setAddTaskForm((f) => ({ ...f, isMilestone: false }))}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <label className="add-task-field">
                    <span className="add-task-label">Phase (optional)</span>
                    <input
                      type="text"
                      className="add-task-input"
                      value={addTaskForm.phase}
                      onChange={(e) => setAddTaskForm((f) => ({ ...f, phase: e.target.value }))}
                      placeholder="e.g. Foundations, Deep Work"
                    />
                  </label>
                </div>
                <div className="add-task-actions">
                  <button type="submit" className="add-task-submit icon-btn" title="Add task" aria-label="Add task">
                    <IoCheckmark size={18} />
                  </button>
                  <button
                    type="button"
                    className="add-task-cancel icon-btn"
                    onClick={() => setAddTaskOpen(false)}
                    title="Cancel"
                    aria-label="Cancel"
                  >
                    <IoClose size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {settingsOpen && (
          <div
            className="settings-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-dialog-title"
            onClick={() => setSettingsOpen(false)}
          >
            <div className="settings-dialog" onClick={(e) => e.stopPropagation()}>
              <h2 id="settings-dialog-title" className="settings-dialog-title">
                Week settings
              </h2>
              <form
                className="settings-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setWeekSettings(settingsForm);
                  setSettings(settingsForm);
                  setSettingsOpen(false);
                }}
              >
                <label className="add-task-field">
                  <span className="add-task-label">WFH – Hours available</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={settingsForm.wfhHours}
                    onChange={(e) =>
                      setSettingsForm((f) => ({ ...f, wfhHours: e.target.value }))
                    }
                    placeholder="e.g. 4–5 hrs available"
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">Office – Hours available</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={settingsForm.officeHours}
                    onChange={(e) =>
                      setSettingsForm((f) => ({ ...f, officeHours: e.target.value }))
                    }
                    placeholder="e.g. 2 hrs available"
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">Weekend – Hours available</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={settingsForm.weekendHours}
                    onChange={(e) =>
                      setSettingsForm((f) => ({ ...f, weekendHours: e.target.value }))
                    }
                    placeholder="e.g. 4–5 hrs available"
                  />
                </label>
                <div className="settings-day-types">
                  <span className="add-task-label">Day type per weekday</span>
                  <p className="settings-day-types-hint">Choose WFH, Office, or Weekend for each day.</p>
                  {DAY_ORDER.map((dayAbbr) => {
                    const current = (settingsForm.weekdayDayType ?? {})[dayAbbr] ?? 'office';
                    const setDayType = (type: DayType) =>
                      setSettingsForm((f) => ({
                        ...f,
                        weekdayDayType: { ...(f.weekdayDayType ?? {}), [dayAbbr]: type },
                      }));
                    return (
                      <div key={dayAbbr} className="settings-day-type-row">
                        <span className="settings-day-type-label">{dayAbbr}</span>
                        {(['wfh', 'office', 'weekend'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={`settings-day-type-btn ${current === type ? 'active' : ''}`}
                            onClick={() => setDayType(type)}
                          >
                            {type === 'weekend' ? 'Weekend' : type === 'office' ? 'Office' : 'WFH'}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div className="add-task-actions">
                  <button type="submit" className="add-task-submit icon-btn" title="Save" aria-label="Save">
                    <IoCheckmark size={18} />
                  </button>
                  <button
                    type="button"
                    className="add-task-cancel icon-btn"
                    onClick={() => setSettingsOpen(false)}
                    title="Cancel"
                    aria-label="Cancel"
                  >
                    <IoClose size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  const weeks = month.weeks;
  const week = weeks[Math.min(activeWeek, weeks.length - 1)];
  const days = week.days;
  const day = days[Math.min(activeDay, days.length - 1)];

  const monthProgress = () => {
    let total = 0,
      done = 0;
    month.weeks.forEach((w: RoadmapWeek) =>
      w.days.forEach((d: RoadmapDay) =>
        d.tasks.forEach((t: RoadmapTask) => {
          total++;
          if (checked[t.id]) done++;
        })
      )
    );
    return total ? Math.round((done / total) * 100) : 0;
  };

  const dayProgress = () => {
    const total = day.tasks.length;
    const done = day.tasks.filter((t: RoadmapTask) => checked[t.id]).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const dp = dayProgress();
  const mp = monthProgress();
  const dayTotalMinutes = day.tasks.reduce((sum, t) => sum + parseTimeToMinutes(t.time), 0);
  const getEffectiveDayType = (d: RoadmapDay): keyof typeof DAY_COLORS =>
    (weekSettings?.weekdayDayType?.[d.day as keyof typeof weekSettings.weekdayDayType] ?? d.type) as keyof typeof DAY_COLORS;
  const effectiveDayType = getEffectiveDayType(day);
  const dc = DAY_COLORS[effectiveDayType];
  const accentColor = month.color;

  const startFresh = async () => {
    if (!window.confirm('Start fresh? This will replace your current roadmap with a fully empty one. Add a task or import CSV to get started. Your progress (checked tasks) will be kept.')) return;
    await db.setCustomRoadmap([]);
    setRoadmap([]);
    setActiveMonth(0);
    setActiveWeek(0);
    setActiveDay(0);
  };

  return (
    <div className="app" data-theme={theme} style={{ ['--accent']: accentColor } as React.CSSProperties}>
      <header className="header">
        <div className="header-top">
          <span className="header-title">Daily Tracker</span>
          <div className="header-actions">
            <button
              type="button"
              className="import-csv-btn theme-toggle-btn icon-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
            </button>
            <button type="button" className="import-csv-btn icon-btn" onClick={handleAddTaskOpen} title="Add task" aria-label="Add task">
              <IoAddOutline size={18} />
            </button>
            <label className="import-csv-btn icon-btn" title="Import CSV" aria-label="Import CSV">
              <input type="file" accept=".csv" onChange={handleImportFile} className="import-csv-input" />
              <AiOutlineImport size={18} />
            </label>
            {roadmap.length > 0 && (
              <>
                <button type="button" className="import-csv-btn icon-btn" onClick={handleExportCsv} title="Export CSV" aria-label="Export CSV">
                  <AiOutlineExport size={18} />
                </button>
                <button type="button" className="reset-roadmap-btn icon-btn" onClick={startFresh} title="Start fresh" aria-label="Start fresh">
                  <IoRefreshOutline size={18} />
                </button>
              </>
            )}
            <button
              type="button"
              className="import-csv-btn header-settings-btn icon-btn"
              onClick={() => {
                setSettingsForm(weekSettings);
                setSettingsOpen(true);
              }}
              title="Week settings"
              aria-label="Settings"
            >
              <IoSettingsOutline size={18} />
            </button>
          </div>
        </div>

        {importError && (
          <div className="import-error" role="alert">
            {importError}
            <button type="button" className="import-error-dismiss icon-btn" onClick={() => setImportError(null)} title="Dismiss" aria-label="Dismiss">
              <IoClose size={16} />
            </button>
          </div>
        )}

        {importPreview && (
          <div className="import-preview">
            <p className="import-preview-text">
              {importPreview.taskCount} tasks, {importPreview.completedCount} completed
            </p>
            <div className="import-preview-actions">
              <button type="button" className="import-preview-btn primary icon-btn" onClick={applyImportAsRoadmap} title="Use as my roadmap" aria-label="Use as my roadmap">
                <AiOutlineImport size={18} />
              </button>
              <button type="button" className="import-preview-btn icon-btn" onClick={applyImportProgressOnly} title="Import progress only" aria-label="Import progress only">
                <IoRefreshOutline size={18} />
              </button>
              <button type="button" className="import-preview-btn icon-btn" onClick={() => setImportPreview(null)} title="Cancel" aria-label="Cancel">
                <IoClose size={18} />
              </button>
            </div>
          </div>
        )}

        <div className="month-tabs-scroll">
          <div className="month-tabs">
            {roadmap.map((m: RoadmapMonth, i: number) => (
              <button
                key={m.id}
                type="button"
                className={`month-tab${activeMonth === i ? ' active' : ''}`}
                style={
                  activeMonth === i
                    ? { ['--accent']: m.color, borderColor: m.color, color: m.color } as React.CSSProperties
                    : undefined
                }
                onClick={() => setActiveMonthAndPersist(i)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="month-progress"
          style={{ ['--accent']: accentColor, ['--progress-pct']: `${mp}%` } as React.CSSProperties}
        >
          <div className="month-progress-top">
            <span className="month-progress-label">
              {month.label} — {month.subtitle}
            </span>
            <span className="month-progress-pct">{mp}% DONE</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" />
          </div>
        </div>
      </header>

      <div className="layout-main">
        <aside className="sidebar">
          <div className="sidebar-label">WEEKS</div>
          {weeks.map((w: RoadmapWeek, i: number) => {
            let wDone = 0,
              wTotal = 0;
            w.days.forEach((d: RoadmapDay) =>
              d.tasks.forEach((t: RoadmapTask) => {
                wTotal++;
                if (checked[t.id]) wDone++;
              })
            );
            const wPct = wTotal ? Math.round((wDone / wTotal) * 100) : 0;
            return (
              <div key={w.id} className="week-item">
                <button
                  type="button"
                  className={`week-btn${activeWeek === i ? ' active' : ''}`}
                  style={
                    activeWeek === i ? { borderColor: `${accentColor}66`, color: accentColor } : undefined
                  }
                  onClick={() => setActiveWeekAndPersist(i)}
                >
                  {w.label}
                </button>
                <div className="progress-bar-track sidebar-progress">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${wPct}%`,
                      background: activeWeek === i ? accentColor : '#2a2a2a',
                    }}
                  />
                </div>
              </div>
            );
          })}

          {week && (
            <div className="sidebar-week-total">
              <span className="sidebar-week-total-label">Total time</span>
              <span className="sidebar-week-total-value">
                {formatMinutes(
                  week.days.reduce(
                    (sum, d) =>
                      sum + d.tasks.reduce((s, t) => s + parseTimeToMinutes(t.time), 0),
                    0
                  )
                )}
              </span>
            </div>
          )}

          <button
            type="button"
            className="sidebar-settings-btn icon-btn"
            onClick={() => {
              setSettingsForm(weekSettings);
              setSettingsOpen(true);
            }}
            title="Week settings"
            aria-label="Settings"
          >
            <IoSettingsOutline size={18} />
          </button>
        </aside>

        <main className="content-main">
          <div className="day-tabs">
            {days.map((d: RoadmapDay, i: number) => {
              const dc2 = DAY_COLORS[getEffectiveDayType(d)];
              const dDone = d.tasks.filter((t: RoadmapTask) => checked[t.id]).length;
              const dPct = d.tasks.length ? Math.round((dDone / d.tasks.length) * 100) : 0;
              return (
                <div
                  key={d.day}
                  role="button"
                  tabIndex={0}
                  className={`day-tab${activeDay === i ? ' active' : ''}`}
                  style={
                    activeDay === i ? { borderBottomColor: dc2.badge, color: dc2.badge } : undefined
                  }
                  onClick={() => setActiveDayAndPersist(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveDayAndPersist(i);
                  }}
                >
                  <div className="day-tab-inner">{d.day}</div>
                  <div
                    className={`day-tab-pct${activeDay === i ? ' active' : ' inactive'}`}
                    style={activeDay === i ? { color: `${dc2.badge}99` } : undefined}
                  >
                    {dPct}%
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="day-header"
            style={{ ['--day-badge']: dc.badge } as React.CSSProperties}
          >
            <div className="day-header-left">
              <span className="day-badge">{dc.label}</span>
              <span className="day-hours">
                {effectiveDayType === 'wfh'
                  ? weekSettings.wfhHours
                  : effectiveDayType === 'office'
                    ? weekSettings.officeHours
                    : weekSettings.weekendHours}
              </span>
            </div>
            <div className="day-header-right">
              <span className="day-stats">
                {dp.done}/{dp.total} tasks
              </span>
              <span className="day-total-time" title="Total task time this day">
                {formatMinutes(dayTotalMinutes)}
              </span>
              <div className="day-progress-wrap">
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${dp.pct}%`, background: dc.badge }}
                  />
                </div>
              </div>
              <span className="month-progress-pct" style={{ color: dc.badge }}>
                {dp.pct}%
              </span>
            </div>
          </div>

          <div className="task-list">
            {[...day.tasks]
              .sort((a, b) => (b.isMilestone ? 1 : 0) - (a.isMilestone ? 1 : 0))
              .map((task: RoadmapTask) => {
                const isDone = !!checked[task.id];
                const hasBadges = task.tag || task.taskType || task.phase || task.isMilestone;
                return (
                  <article
                    key={task.id}
                    className={`task-card${isDone ? ' task-card--done' : ''}`}
                    onClick={() => toggle(task.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') toggle(task.id);
                    }}
                    style={
                      !isDone
                        ? { ['--task-accent']: dc.badge } as React.CSSProperties
                        : undefined
                    }
                  >
                    <header className="task-card__header">
                      <div className="task-card__check-and-title">
                        <div
                          className={`task-card__checkbox${isDone ? ' task-card__checkbox--checked' : ''}`}
                          style={
                            isDone
                              ? { borderColor: dc.badge, background: `${dc.badge}22` }
                              : undefined
                          }
                        >
                          {isDone && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                              <path
                                d="M2 5L4.2 7.5L8 3"
                                stroke={dc.badge}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <h3 className="task-card__title">{task.text}</h3>
                      </div>
                      <span
                        className="task-card__duration"
                        title="Duration (minutes)"
                      >
                        {formatMinutes(parseTimeToMinutes(task.time))}
                      </span>
                    </header>

                    {hasBadges && (
                      <div className="task-card__badges">
                        {task.tag && (
                          <span className="task-card__badge task-card__badge--tag">{task.tag}</span>
                        )}
                        {task.taskType && (
                          <span className="task-card__badge task-card__badge--type">{task.taskType}</span>
                        )}
                        {task.phase && (
                          <span className="task-card__badge task-card__badge--phase">{task.phase}</span>
                        )}
                        {task.isMilestone && (
                          <span className="task-card__badge task-card__badge--milestone" title="Milestone">
                            ★ Milestone
                          </span>
                        )}
                      </div>
                    )}

                    {task.detail && (
                      <p className="task-card__detail">{task.detail}</p>
                    )}

                    <footer className="task-card__footer">
                      <div className="task-card__ref">
                        {task.url ? (
                          <a
                            href={task.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="task-card__link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            ↗ {task.ref || 'Link'}
                          </a>
                        ) : (
                          <span className="task-card__ref-label">
                            {task.ref ? `📌 ${task.ref}` : '—'}
                          </span>
                        )}
                      </div>
                      <div className="task-card__actions">
                        <button
                          type="button"
                          className="task-card__btn task-card__btn--edit icon-btn"
                          title="Edit task"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTaskOpen(task);
                          }}
                          aria-label={`Edit task: ${task.text}`}
                        >
                          <IoCreateOutline size={16} />
                        </button>
                        <button
                          type="button"
                          className="task-card__btn task-card__btn--delete icon-btn"
                          title="Delete task"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task.id);
                          }}
                          aria-label={`Delete task: ${task.text}`}
                        >
                          <IoTrashOutline size={16} />
                        </button>
                      </div>
                    </footer>
                  </article>
                );
              })}
          </div>
        </main>
      </div>

      {addTaskOpen && (
        <div
          className="add-task-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-task-dialog-title"
          onClick={() => setAddTaskOpen(false)}
        >
          <div className="add-task-dialog" onClick={(e) => e.stopPropagation()}>
            <h2 id="add-task-dialog-title" className="add-task-dialog-title">
              Add task
            </h2>
            <form onSubmit={handleAddTaskSubmit} className="add-task-form">
              <label className="add-task-field">
                <span className="add-task-label">Date</span>
                <input
                  type="date"
                  className="add-task-input"
                  value={addTaskForm.taskDate}
                  onChange={(e) => setAddTaskForm((f) => ({ ...f, taskDate: e.target.value }))}
                  required
                  autoFocus
                />
              </label>
              {addTaskForm.taskDate && (() => {
                const d = new Date(addTaskForm.taskDate + 'T12:00:00');
                const ym = getYearMonth(d);
                const weekNum = getWeekInMonth(d);
                const dayAbbr = getDayAbbrFromDate(d);
                const dayType = getDayTypeFromDate(d, weekSettings?.weekdayDayType);
                const dayTypeLabel = dayType === 'weekend' ? 'Weekend' : dayType === 'office' ? 'Office' : 'WFH';
                return (
                  <div className="add-task-readonly">
                    <div className="add-task-readonly-row"><strong>Month:</strong> {formatMonthLabel(ym)}</div>
                    <div className="add-task-readonly-row"><strong>Week:</strong> {weekNum}</div>
                    <div className="add-task-readonly-row"><strong>Day:</strong> {dayAbbr}</div>
                    <div className="add-task-readonly-row"><strong>Day type:</strong> {dayTypeLabel}</div>
                  </div>
                );
              })()}
              <div className="add-task-form-row">
                <label className="add-task-field">
                  <span className="add-task-label">Task title</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={addTaskForm.text}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, text: e.target.value }))}
                    placeholder="e.g. Watch Task 1 – Introduction"
                    required
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">Duration (minutes)</span>
                  <input
                    type="number"
                    min={1}
                    className="add-task-input"
                    value={addTaskForm.time}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, time: e.target.value }))}
                    placeholder="e.g. 30"
                  />
                </label>
              </div>
              <label className="add-task-field">
                <span className="add-task-label">Details (optional)</span>
                <textarea
                  className="add-task-input add-task-textarea"
                  value={addTaskForm.detail}
                  onChange={(e) => setAddTaskForm((f) => ({ ...f, detail: e.target.value }))}
                  placeholder="Short description"
                  rows={2}
                />
              </label>
              <div className="add-task-form-row">
                <label className="add-task-field">
                  <span className="add-task-label">Reference label (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={addTaskForm.ref}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, ref: e.target.value }))}
                    placeholder="e.g. Your Course: Task 1"
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">URL (optional)</span>
                  <input
                    type="url"
                    className="add-task-input"
                    value={addTaskForm.url}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, url: e.target.value }))}
                    placeholder="https://..."
                  />
                </label>
              </div>
              <div className="add-task-form-row">
                <label className="add-task-field">
                  <span className="add-task-label">Task Type (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={addTaskForm.taskType}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, taskType: e.target.value }))}
                    placeholder="e.g. Lecture, Practice"
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">Tag (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={addTaskForm.tag}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, tag: e.target.value }))}
                    placeholder="e.g. Research, Figma"
                  />
                </label>
              </div>
              <div className="add-task-form-row">
                <div className="add-task-field">
                  <span className="add-task-label">Is Milestone</span>
                  <div className="add-task-badge-group" role="group" aria-label="Is Milestone">
                    <button
                      type="button"
                      className={`add-task-badge-option${addTaskForm.isMilestone ? ' selected' : ''}`}
                      onClick={() => setAddTaskForm((f) => ({ ...f, isMilestone: true }))}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`add-task-badge-option${!addTaskForm.isMilestone ? ' selected' : ''}`}
                      onClick={() => setAddTaskForm((f) => ({ ...f, isMilestone: false }))}
                    >
                      No
                    </button>
                  </div>
                </div>
                <label className="add-task-field">
                  <span className="add-task-label">Phase (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={addTaskForm.phase}
                    onChange={(e) => setAddTaskForm((f) => ({ ...f, phase: e.target.value }))}
                    placeholder="e.g. Foundations, Deep Work"
                  />
                </label>
              </div>
              <div className="add-task-actions">
                <button type="submit" className="add-task-submit icon-btn" title="Add task" aria-label="Add task">
                  <IoCheckmark size={18} />
                </button>
                <button
                  type="button"
                  className="add-task-cancel icon-btn"
                  onClick={() => setAddTaskOpen(false)}
                  title="Cancel"
                  aria-label="Cancel"
                >
                  <IoClose size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editTaskId && (
        <div
          className="add-task-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-task-dialog-title"
          onClick={() => setEditTaskId(null)}
        >
          <div className="add-task-dialog" onClick={(e) => e.stopPropagation()}>
            <h2 id="edit-task-dialog-title" className="add-task-dialog-title">
              Edit task
            </h2>
            <form onSubmit={handleEditTaskSubmit} className="add-task-form">
              <div className="add-task-form-row">
                <label className="add-task-field">
                  <span className="add-task-label">Task title</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={editTaskForm.text}
                    onChange={(e) => setEditTaskForm((f) => ({ ...f, text: e.target.value }))}
                    placeholder="e.g. Watch Task 1 – Introduction"
                    required
                    autoFocus
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">Duration (minutes)</span>
                  <input
                    type="number"
                    min={1}
                    className="add-task-input"
                    value={editTaskForm.time}
                    onChange={(e) => setEditTaskForm((f) => ({ ...f, time: e.target.value }))}
                    placeholder="e.g. 30"
                  />
                </label>
              </div>
              <label className="add-task-field">
                <span className="add-task-label">Details (optional)</span>
                <textarea
                  className="add-task-input add-task-textarea"
                  value={editTaskForm.detail}
                  onChange={(e) => setEditTaskForm((f) => ({ ...f, detail: e.target.value }))}
                  placeholder="Short description"
                  rows={2}
                />
              </label>
              <div className="add-task-form-row">
                <label className="add-task-field">
                  <span className="add-task-label">Reference label (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={editTaskForm.ref}
                    onChange={(e) => setEditTaskForm((f) => ({ ...f, ref: e.target.value }))}
                    placeholder="e.g. Your Course: Task 1"
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">URL (optional)</span>
                  <input
                    type="url"
                    className="add-task-input"
                    value={editTaskForm.url}
                    onChange={(e) => setEditTaskForm((f) => ({ ...f, url: e.target.value }))}
                    placeholder="https://..."
                  />
                </label>
              </div>
              <div className="add-task-form-row">
                <label className="add-task-field">
                  <span className="add-task-label">Task Type (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={editTaskForm.taskType}
                    onChange={(e) => setEditTaskForm((f) => ({ ...f, taskType: e.target.value }))}
                    placeholder="e.g. Lecture, Practice"
                  />
                </label>
                <label className="add-task-field">
                  <span className="add-task-label">Tag (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={editTaskForm.tag}
                    onChange={(e) => setEditTaskForm((f) => ({ ...f, tag: e.target.value }))}
                    placeholder="e.g. Research, Figma"
                  />
                </label>
              </div>
              <div className="add-task-form-row">
                <div className="add-task-field">
                  <span className="add-task-label">Is Milestone</span>
                  <div className="add-task-badge-group" role="group" aria-label="Is Milestone">
                    <button
                      type="button"
                      className={`add-task-badge-option${editTaskForm.isMilestone ? ' selected' : ''}`}
                      onClick={() => setEditTaskForm((f) => ({ ...f, isMilestone: true }))}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`add-task-badge-option${!editTaskForm.isMilestone ? ' selected' : ''}`}
                      onClick={() => setEditTaskForm((f) => ({ ...f, isMilestone: false }))}
                    >
                      No
                    </button>
                  </div>
                </div>
                <label className="add-task-field">
                  <span className="add-task-label">Phase (optional)</span>
                  <input
                    type="text"
                    className="add-task-input"
                    value={editTaskForm.phase}
                    onChange={(e) => setEditTaskForm((f) => ({ ...f, phase: e.target.value }))}
                    placeholder="e.g. Foundations, Deep Work"
                  />
                </label>
              </div>
              <div className="add-task-actions">
                <button type="submit" className="add-task-submit icon-btn" title="Save changes" aria-label="Save changes">
                  <IoCheckmark size={18} />
                </button>
                <button
                  type="button"
                  className="add-task-cancel icon-btn"
                  onClick={() => setEditTaskId(null)}
                  title="Cancel"
                  aria-label="Cancel"
                >
                  <IoClose size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div
          className="settings-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-dialog-title"
          onClick={() => setSettingsOpen(false)}
        >
          <div className="settings-dialog" onClick={(e) => e.stopPropagation()}>
            <h2 id="settings-dialog-title" className="settings-dialog-title">
              Week settings
            </h2>
            <form
              className="settings-form"
              onSubmit={(e) => {
                e.preventDefault();
                setWeekSettings(settingsForm);
                setSettings(settingsForm);
                setSettingsOpen(false);
              }}
            >
              <label className="add-task-field">
                <span className="add-task-label">WFH – Hours available</span>
                <input
                  type="text"
                  className="add-task-input"
                  value={settingsForm.wfhHours}
                  onChange={(e) =>
                    setSettingsForm((f) => ({ ...f, wfhHours: e.target.value }))
                  }
                  placeholder="e.g. 4–5 hrs available"
                />
              </label>
              <label className="add-task-field">
                <span className="add-task-label">Office – Hours available</span>
                <input
                  type="text"
                  className="add-task-input"
                  value={settingsForm.officeHours}
                  onChange={(e) =>
                    setSettingsForm((f) => ({ ...f, officeHours: e.target.value }))
                  }
                  placeholder="e.g. 2 hrs available"
                />
              </label>
              <label className="add-task-field">
                <span className="add-task-label">Weekend – Hours available</span>
                <input
                  type="text"
                  className="add-task-input"
                  value={settingsForm.weekendHours}
                  onChange={(e) =>
                    setSettingsForm((f) => ({ ...f, weekendHours: e.target.value }))
                  }
                  placeholder="e.g. 4–5 hrs available"
                />
              </label>
              <div className="settings-day-types">
                <span className="add-task-label">Day type per weekday</span>
                <p className="settings-day-types-hint">Choose WFH, Office, or Weekend for each day.</p>
                {DAY_ORDER.map((dayAbbr) => {
                  const current = (settingsForm.weekdayDayType ?? {})[dayAbbr] ?? 'office';
                  const setDayType = (type: DayType) =>
                    setSettingsForm((f) => ({
                      ...f,
                      weekdayDayType: { ...(f.weekdayDayType ?? {}), [dayAbbr]: type },
                    }));
                  return (
                    <div key={dayAbbr} className="settings-day-type-row">
                      <span className="settings-day-type-label">{dayAbbr}</span>
                      {(['wfh', 'office', 'weekend'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`settings-day-type-btn ${current === type ? 'active' : ''}`}
                          onClick={() => setDayType(type)}
                        >
                          {type === 'weekend' ? 'Weekend' : type === 'office' ? 'Office' : 'WFH'}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className="add-task-actions">
                <button type="submit" className="add-task-submit icon-btn" title="Save" aria-label="Save">
                  <IoCheckmark size={18} />
                </button>
                <button
                  type="button"
                  className="add-task-cancel icon-btn"
                  onClick={() => setSettingsOpen(false)}
                  title="Cancel"
                  aria-label="Cancel"
                >
                  <IoClose size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
