import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { ROADMAP, DAY_COLORS } from './constants';
import type { RoadmapMonth, RoadmapWeek, RoadmapDay, RoadmapTask } from './constants';

export default function App() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await window.storage?.get("pd-checklist-checked");
        if (r?.value) setChecked(JSON.parse(r.value));
      } catch {
        // ignore load errors (e.g. no storage API)
      }
      setLoaded(true);
    };
    load();
  }, []);

  const save = useCallback(async (newChecked: Record<string, boolean>) => {
    try {
      await window.storage?.set("pd-checklist-checked", JSON.stringify(newChecked));
    } catch {
      // ignore save errors
    }
  }, []);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    save(next);
  };

  const month = ROADMAP[activeMonth];
  const weeks = month.weeks;
  const week = weeks[Math.min(activeWeek, weeks.length - 1)];
  const days = week.days;
  const day = days[Math.min(activeDay, days.length - 1)];

  const monthProgress = () => {
    let total = 0, done = 0;
    month.weeks.forEach((w: RoadmapWeek) => w.days.forEach((d: RoadmapDay) => d.tasks.forEach((t: RoadmapTask) => { total++; if (checked[t.id]) done++; })));
    return total ? Math.round((done / total) * 100) : 0;
  };

  const dayProgress = () => {
    const total = day.tasks.length;
    const done = day.tasks.filter((t: RoadmapTask) => checked[t.id]).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const dp = dayProgress();
  const mp = monthProgress();
  const dc = DAY_COLORS[day.type as keyof typeof DAY_COLORS];
  const accentColor = month.color;

  if (!loaded) return <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#555", fontFamily: "monospace" }}>Loading…</span></div>;

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Courier New', Courier, monospace", color: "#e0e0e0", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .month-tab { cursor: pointer; padding: 8px 14px; font-size: 11px; font-family: 'Space Mono', monospace; border: 1px solid #222; background: #0f0f0f; color: #666; transition: all 0.15s; border-radius: 2px; letter-spacing: 0.05em; }
        .month-tab:hover { border-color: #444; color: #aaa; }
        .month-tab.active { color: #fff; font-weight: 700; }
        .week-btn { cursor: pointer; padding: 6px 12px; font-size: 10px; font-family: 'Space Mono', monospace; border: 1px solid #1e1e1e; background: #0d0d0d; color: #555; transition: all 0.15s; border-radius: 1px; letter-spacing: 0.03em; }
        .week-btn:hover { color: #999; border-color: #333; }
        .week-btn.active { color: #fff; background: #161616; }
        .day-tab { cursor: pointer; padding: 8px 10px; font-size: 10px; font-family: 'Space Mono', monospace; border-bottom: 2px solid transparent; background: transparent; color: #444; transition: all 0.15s; text-align: center; flex: 1; }
        .day-tab:hover { color: #888; }
        .day-tab.active { color: #fff; font-weight: 700; }
        .task-row { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #161616; cursor: pointer; transition: background 0.1s; border-radius: 2px; }
        .task-row:last-child { border-bottom: none; }
        .task-row:hover { background: #0f0f0f; }
        .checkbox { width: 18px; height: 18px; border: 1px solid #333; border-radius: 2px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: all 0.15s; }
        .checkbox.checked { border-color: transparent; }
        .ref-link { font-size: 10px; font-family: 'Space Mono', monospace; padding: 2px 8px; border-radius: 2px; background: #161616; border: 1px solid #252525; color: #666; text-decoration: none; display: inline-block; margin-top: 4px; transition: all 0.1s; }
        .ref-link:hover { background: #1f1f1f; color: #999; border-color: #333; }
        .progress-bar-track { height: 3px; background: #1a1a1a; border-radius: 2px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
        .time-badge { font-size: 9px; padding: 2px 6px; border-radius: 1px; background: #151515; border: 1px solid #1f1f1f; color: #555; flex-shrink: 0; height: fit-content; margin-top: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "16px 20px 0", borderBottom: "1px solid #161616" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Space Mono'", fontSize: 13, fontWeight: 700, color: accentColor, letterSpacing: "0.1em" }}>PD ROADMAP</span>
          <span style={{ fontSize: 10, color: "#444", letterSpacing: "0.05em" }}>6-MONTH DAILY TRACKER</span>
        </div>

        {/* Month tabs */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 0, flexWrap: "wrap" }}>
          {ROADMAP.map((m: RoadmapMonth, i: number) => (
            <button key={m.id} className={`month-tab${activeMonth === i ? " active" : ""}`}
              style={activeMonth === i ? { borderColor: m.color, color: m.color, background: "#0d0d0d" } : {}}
              onClick={() => { setActiveMonth(i); setActiveWeek(0); setActiveDay(0); }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Month progress bar */}
        <div style={{ marginTop: 10, marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 9, color: "#555", letterSpacing: "0.05em" }}>{month.title.toUpperCase()} — {month.subtitle}</span>
            <span style={{ fontSize: 9, color: accentColor, letterSpacing: "0.05em" }}>{mp}% DONE</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${mp}%`, background: accentColor }} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar: weeks */}
        <div style={{ width: 120, background: "#090909", borderRight: "1px solid #161616", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
          <div style={{ fontSize: 9, color: "#333", letterSpacing: "0.08em", marginBottom: 4, paddingLeft: 4 }}>WEEKS</div>
          {weeks.map((w: RoadmapWeek, i: number) => {
            let wDone = 0, wTotal = 0;
            w.days.forEach((d: RoadmapDay) => d.tasks.forEach((t: RoadmapTask) => { wTotal++; if (checked[t.id]) wDone++; }));
            const wPct = wTotal ? Math.round((wDone / wTotal) * 100) : 0;
            return (
              <div key={w.id} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <button className={`week-btn${activeWeek === i ? " active" : ""}`}
                  style={activeWeek === i ? { borderColor: accentColor + "66", color: accentColor } : {}}
                  onClick={() => { setActiveWeek(i); setActiveDay(0); }}>
                  {w.label}
                </button>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${wPct}%`, background: activeWeek === i ? accentColor : "#2a2a2a" }} />
                </div>
              </div>
            );
          })}

          {/* Week theme */}
          {week && (
            <div style={{ marginTop: 12, padding: "8px", background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 2 }}>
              <div style={{ fontSize: 8, color: "#444", letterSpacing: "0.05em", marginBottom: 3 }}>THEME</div>
              <div style={{ fontSize: 9, color: "#777", lineHeight: 1.4 }}>{week.theme}</div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Day tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #161616", background: "#0d0d0d" }}>
            {days.map((d: RoadmapDay, i: number) => {
              const dc2 = DAY_COLORS[d.type as keyof typeof DAY_COLORS];
              const dDone = d.tasks.filter((t: RoadmapTask) => checked[t.id]).length;
              const dPct = d.tasks.length ? Math.round((dDone / d.tasks.length) * 100) : 0;
              return (
                <div key={d.day} className={`day-tab${activeDay === i ? " active" : ""}`}
                  style={activeDay === i ? { borderBottomColor: dc2.badge, color: dc2.badge } : {}}
                  onClick={() => setActiveDay(i)}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>{d.day}</div>
                  <div style={{ fontSize: 8, color: activeDay === i ? dc2.badge + "99" : "#333", marginTop: 1 }}>{dPct}%</div>
                </div>
              );
            })}
          </div>

          {/* Day header */}
          <div style={{ padding: "10px 16px", background: "#0a0a0a", borderBottom: "1px solid #161616", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 1, background: dc.badge + "22", border: `1px solid ${dc.badge}44`, color: dc.badge, letterSpacing: "0.08em", fontWeight: 700 }}>{dc.label}</span>
              <span style={{ fontSize: 10, color: "#555" }}>{dc.label === "OFFICE" ? "2 hrs available" : dc.label === "WFH" ? "4–5 hrs available" : "4–5 hrs available"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 9, color: "#444" }}>{dp.done}/{dp.total} tasks</span>
              <div style={{ width: 60 }}>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${dp.pct}%`, background: dc.badge }} />
                </div>
              </div>
              <span style={{ fontSize: 9, color: dc.badge, fontWeight: 700 }}>{dp.pct}%</span>
            </div>
          </div>

          {/* Task list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 20px" }}>
            {day.tasks.map((task: RoadmapTask) => {
              const isDone = !!checked[task.id];
              return (
                <div key={task.id} className="task-row" onClick={() => toggle(task.id)}>
                  <div className="checkbox" style={{ borderColor: isDone ? dc.badge : "#2a2a2a", background: isDone ? dc.badge + "22" : "transparent" }}>
                    {isDone && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.2 7.5L8 3" stroke={dc.badge} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: isDone ? "#444" : "#e0e0e0", textDecoration: isDone ? "line-through" : "none", lineHeight: 1.4, fontFamily: "'Space Mono', monospace" }}>{task.text}</span>
                      <span className="time-badge" style={{ borderColor: isDone ? "#1a1a1a" : dc.badge + "33", color: isDone ? "#333" : dc.badge }}>{task.time}</span>
                    </div>
                    <p style={{ fontSize: 11, color: isDone ? "#333" : "#666", margin: "4px 0 6px", lineHeight: 1.5, fontFamily: "'Space Mono', monospace" }}>{task.detail}</p>
                    {task.url ? (
                      <a href={task.url} target="_blank" rel="noopener noreferrer" className="ref-link" onClick={e => e.stopPropagation()}>↗ {task.ref}</a>
                    ) : (
                      <span className="ref-link" style={{ cursor: "default" }}>📌 {task.ref}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}