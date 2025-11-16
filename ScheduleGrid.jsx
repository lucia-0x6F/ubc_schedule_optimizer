import React, { useState, useEffect } from "react";

// shorten only Laboratory → Lab
function shortType(type) {
  if (type === "Laboratory") return "Lab";
  return type;
}

// generate consistent color for each course (used only if parent doesn't pass one)
function defaultGetCourseColor(course) {
  const colors = [
    "#A7F3D0", // mint
    "#BFDBFE", // light blue
    "#FBCFE8", // pink
    "#FDE68A", // yellow
    "#C7D2FE", // soft indigo
    "#FCA5A5", // soft red
    "#FDBA74", // orange
  ];

  let hash = 0;
  for (let i = 0; i < course.length; i++) {
    hash = course.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ScheduleGrid({
  schedules = [],      // ⬅ now an ARRAY of schedules (each schedule = array of sections)
  getCourseColor,      // optional color function from parent
}) {
  const [index, setIndex] = useState(0);

  // whenever new schedules come in, reset to first
  useEffect(() => {
    setIndex(0);
  }, [schedules]);

  const hasSchedules = schedules.length > 0;
  const total = schedules.length;

  // pick the current schedule (array of sections)
  const sections = hasSchedules ? schedules[index] : [];

  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const colorForCourse = getCourseColor || defaultGetCourseColor;

  const dayLabelMap = {
    Mon: "MON",
    Tue: "TUE",
    Wed: "WED",
    Thu: "THU",
    Fri: "FRI",
    MON: "MON",
    TUE: "TUE",
    WED: "WED",
    THU: "THU",
    FRI: "FRI",
  };

  // 8:00–21:00 in 30-min increments
  const times = [];
  for (let hour = 8; hour <= 21; hour++) {
    const hh = hour.toString().padStart(2, "0");
    times.push(`${hh}:00`);
    if (hour !== 21) times.push(`${hh}:30`);
  }

  const rowOffset = 2;

  const timeToIndex = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return (h - 8) * 2 + (m === 30 ? 1 : 0);
  };

  // Convert each section into visual blocks (one per day)
  const blocks = [];
  sections.forEach((sec, idx) => {
    const courseName = sec.course || sec.name; // support both shapes
    const courseColor = colorForCourse(courseName || "");

    (sec.days || []).forEach((day) => {
      const dayKey = dayLabelMap[day];
      if (!dayKey) return;

      const dayIndex = days.indexOf(dayKey);
      if (dayIndex === -1) return;

      blocks.push({
        id: `${courseName}-${sec.section}-${day}-${idx}`,
        name: courseName,
        section: sec.section,
        type: sec.type,
        start: sec.start,
        end: sec.end,
        dayIndex,
        color: courseColor,
      });
    });
  });

  const handlePrev = () => {
    if (!hasSchedules || index === 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (!hasSchedules || index === total - 1) return;
    setIndex(index + 1);
  };

  return (
    <div style={styles.container}>
      {/* TOP CONTROLS (prev / label / next) */}
      <div style={styles.controls}>
        <button
          style={{
            ...styles.arrowButton,
            opacity: !hasSchedules || index === 0 ? 0.3 : 1,
            cursor:
              !hasSchedules || index === 0 ? "default" : "pointer",
          }}
          onClick={handlePrev}
          disabled={!hasSchedules || index === 0}
        >
          ❮
        </button>

        <span style={styles.scheduleLabel}>
          {!hasSchedules
            ? "No schedules generated yet"
            : `Schedule ${index + 1} of ${total}`}
        </span>

        <button
          style={{
            ...styles.arrowButton,
            opacity:
              !hasSchedules || index === total - 1 ? 0.3 : 1,
            cursor:
              !hasSchedules || index === total - 1
                ? "default"
                : "pointer",
          }}
          onClick={handleNext}
          disabled={!hasSchedules || index === total - 1}
        >
          ❯
        </button>
      </div>

      <div style={styles.grid}>
        {/* empty corner */}
        <div style={{ ...styles.emptyCorner, gridRow: 1, gridColumn: 1 }}></div>

        {/* day headers */}
        {days.map((day, colIndex) => (
          <div
            key={day}
            style={{
              ...styles.dayHeader,
              gridRow: 1,
              gridColumn: colIndex + 2,
            }}
          >
            {day}
          </div>
        ))}

        {/* time labels + empty cells */}
        {times.map((time, rowIndex) => {
          const gridRow = rowIndex + rowOffset;
          return (
            <React.Fragment key={time}>
              <div
                style={{
                  ...styles.timeLabel,
                  gridRow,
                  gridColumn: 1,
                }}
              >
                {time.endsWith(":00") ? time : ""}
              </div>

              {days.map((day, colIndex) => (
                <div
                  key={day + time}
                  style={{
                    ...styles.cell,
                    gridRow,
                    gridColumn: colIndex + 2,
                  }}
                ></div>
              ))}
            </React.Fragment>
          );
        })}

        {/* course blocks */}
        {blocks.map((block) => {
          const rowStart = timeToIndex(block.start) + rowOffset;
          const rowEnd = timeToIndex(block.end) + rowOffset;

          return (
            <div
              key={block.id}
              style={{
                ...styles.block,
                gridColumn: `${block.dayIndex + 2} / ${block.dayIndex + 3}`,
                gridRow: `${rowStart} / ${rowEnd}`,
                backgroundColor: block.color,
              }}
            >
              {/* Course name + section */}
              <div style={styles.blockTitle}>
                {block.name} {block.section}
              </div>

              {/* Course type (ONLY Lab shortened) */}
              <div style={styles.blockType}>
                {shortType(block.type)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//
// STYLES (unchanged from your version)
//
const styles = {
  container: {
    width: "100%",
    overflow: "auto",
  },

  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    marginBottom: 12,
  },

  arrowButton: {
    background: "transparent",
    border: "none",
    fontSize: "28px",
    color: "#d1d5db",
    cursor: "default",
  },

  scheduleLabel: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#374151",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "80px repeat(5, 1fr)",
    gridAutoRows: "30px",
    width: "100%",
    borderTop: "1px solid #d4d4d8",
    borderLeft: "1px solid #d4d4d8",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 24px rgba(15,23,42,0.15)",
  },

  emptyCorner: {
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
    backgroundColor: "#f3f4f6",
  },

  dayHeader: {
    textAlign: "center",
    padding: "8px 0",
    fontWeight: 600,
    fontSize: "13px",
    backgroundColor: "#f3f4f6",
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
  },

  timeLabel: {
    paddingLeft: "10px",
    fontSize: "12px",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #e5e7eb",
  },

  cell: {
    borderRight: "1px solid #f3f4f6",
    borderBottom: "1px solid #f3f4f6",
  },

  block: {
    borderRadius: "10px",
    padding: "4px 6px",
    margin: "2px",
    color: "#111827",
    fontSize: "11px",
    boxShadow: "0 4px 8px rgba(15,23,42,0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
  },

  blockTitle: {
    fontWeight: 600,
    fontSize: "11px",
  },

  blockType: {
    fontSize: "10px",
    opacity: 0.9,
  },
};
