// ScheduleGrid.jsx
import React, { useState, useEffect } from "react";

// SAME palette + hash function as in CourseSearch
const COURSE_COLORS = [
  "#bfdbfe", // blue
  "#fecaca", // red
  "#bbf7d0", // green
  "#fde68a", // yellow
  "#f5d0fe", // purple
  "#fed7aa", // orange
  "#a5f3fc", // teal
];

function getColorForCourse(courseName = "") {
  let hash = 0;
  for (let i = 0; i < courseName.length; i++) {
    hash = (hash * 31 + courseName.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % COURSE_COLORS.length;
  return COURSE_COLORS[index];
}

export default function ScheduleGrid({ schedules = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // When new schedules are generated, reset to the first one
  useEffect(() => {
    setCurrentIndex(0);
  }, [schedules]);

  const hasSchedules = schedules && schedules.length > 0;
  const total = hasSchedules ? schedules.length : 0;
  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  // 8:00–21:00 in 30-min steps
  const times = [];
  for (let hour = 8; hour <= 21; hour++) {
    const hh = hour.toString().padStart(2, "0");
    times.push(`${hh}:00`);
    if (hour !== 21) times.push(`${hh}:30`);
  }

  const rowOffset = 2; // row 1 = headers, row 2 = 08:00

  const timeToIndex = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return (h - 8) * 2 + (m === 30 ? 1 : 0);
  };

  // current schedule to render
  const schedule = hasSchedules ? schedules[currentIndex] || [] : [];

  const typeToShort = (type) => {
    switch (type) {
      case "Lecture":
        return "LEC";
      case "Laboratory":
        return "LAB";
      case "Discussion":
        return "DIS";
      case "Seminar":
        return "SEM";
      default:
        return type || "";
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `80px repeat(${days.length}, 1fr)`,
    gridAutoRows: "32px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "0.78rem",
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  };

  const navButtonStyle = (disabled) => ({
    border: "none",
    backgroundColor: disabled ? "rgba(148,163,184,0.25)" : "rgba(30,64,175,0.95)",
    color: "#f9fafb",
    borderRadius: "999px",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: disabled ? "none" : "0 4px 10px rgba(30,64,175,0.35)",
    transition: "transform 0.08s ease-out, box-shadow 0.08s ease-out",
  });

  const handlePrev = () => {
    if (!hasSchedules || currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!hasSchedules || currentIndex === total - 1) return;
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div>
      {/* Header row with title + schedule navigation */}
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
            Schedule Grid
          </h2>
          {!hasSchedules && (
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "0.9rem",
                color: "#6b7280",
              }}
            >
              No valid schedules yet. Select courses and click “Generate schedule”.
            </p>
          )}
        </div>

        {hasSchedules && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              color: "#374151",
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              style={navButtonStyle(currentIndex === 0)}
            >
              ‹
            </button>
            <span>
              Schedule{" "}
              <strong>{currentIndex + 1}</strong> of <strong>{total}</strong>
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === total - 1}
              style={navButtonStyle(currentIndex === total - 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div style={gridStyle}>
        {/* top-left empty cell */}
        <div style={{ gridRow: 1, gridColumn: 1 }} />

        {/* day headers */}
        {days.map((day, idx) => (
          <div
            key={day}
            style={{
              gridRow: 1,
              gridColumn: idx + 2,
              textAlign: "center",
              fontWeight: 600,
              backgroundColor: "#eef2ff",
              borderLeft: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {day}
          </div>
        ))}

        {/* time labels */}
        {times.map((t, idx) => (
          <div
            key={t}
            style={{
              gridRow: idx + rowOffset,
              gridColumn: 1,
              fontSize: "0.7rem",
              paddingRight: "6px",
              textAlign: "right",
              borderTop: "1px solid #f3f4f6",
              backgroundColor: "#f9fafb",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {t}
          </div>
        ))}

        {/* section blocks */}
        {schedule.map((sec, i) => {
          const dayIndex = days.indexOf(sec.day);
          if (dayIndex === -1) return null;

          const startIndex = timeToIndex(sec.start);
          const endIndex = timeToIndex(sec.end);

          const gridColumn = dayIndex + 2;
          const gridRowStart = startIndex + rowOffset;
          const gridRowEnd = endIndex + rowOffset;

          const courseLabel = sec.courseName || sec.course || "Course";
          const sectionLabel = sec.section || sec.sectionCode || "";
          const typeLabel = typeToShort(sec.type);
          const color = getColorForCourse(courseLabel);

          const key =
            sec.id ||
            `${courseLabel}-${sectionLabel}-${sec.day}-${sec.start}-${i}`;

          return (
            <div
              key={key}
              style={{
                gridColumn,
                gridRow: `${gridRowStart} / ${gridRowEnd}`,
                margin: "3px",
                borderRadius: "10px",
                backgroundColor: color,
                border: "1px solid rgba(15,23,42,0.18)",
                boxShadow: "0 4px 10px rgba(15,23,42,0.18)",
                padding: "4px 6px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  marginBottom: "2px",
                }}
              >
                {courseLabel}
              </div>
              <div style={{ fontSize: "0.7rem", marginBottom: "2px" }}>
                {sectionLabel && <span>{sectionLabel} · </span>}
                {typeLabel && <span>{typeLabel}</span>}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#111827" }}>
                {sec.day} {sec.start}–{sec.end}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
