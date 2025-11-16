import React, { useState } from "react";

export default function ScheduleGrid({ selectedCourses, schedules = [] }) {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  // 8:00–21:00 with 30-min steps
  const times = [];
  for (let hour = 8; hour <= 21; hour++) {
    times.push(`${hour}:00`);
    if (hour !== 21) times.push(`${hour}:30`);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasSchedules = schedules && schedules.length > 0;

  const handlePrev = () => {
    if (!hasSchedules) return;
    setCurrentIndex((prev) => (prev - 1 + schedules.length) % schedules.length);
  };

  const handleNext = () => {
    if (!hasSchedules) return;
    setCurrentIndex((prev) => (prev + 1) % schedules.length);
  };

  return (
    <div style={styles.container}>
      {/* Top controls: previous / next schedule */}
      <div style={styles.controls}>
  <button
    type="button"
    style={styles.arrowButton}
    onClick={handlePrev}
    disabled={!hasSchedules}
  >
    ❮
  </button>

  <span style={styles.scheduleLabel}>
  {hasSchedules
    ? `${currentIndex + 1} / ${schedules.length}`
    : "No schedules generated yet"}
</span>


  <button
    type="button"
    style={styles.arrowButton}
    onClick={handleNext}
    disabled={!hasSchedules}
  >
    ❯
  </button>
</div>


      {/* (optional) show selected courses for now */}
      {selectedCourses && selectedCourses.length > 0 && (
        <div style={styles.debugText}>
          Selected: {selectedCourses.join(", ")}
        </div>
      )}

      {/* Calendar grid */}
      <div style={styles.grid}>
        {/* top-left empty corner */}
        <div style={styles.emptyCorner}></div>

        {/* day headers */}
        {days.map((day) => (
          <div key={day} style={styles.dayHeader}>
            {day}
          </div>
        ))}

        {/* time labels + grid cells */}
        {times.map((time) => (
          <React.Fragment key={time}>
            {/* time label column */}
            <div style={styles.timeLabel}>
              {time.endsWith(":00") ? time : ""}
            </div>

            {/* 5 cells for Mon–Fri */}
            {days.map((day) => (
              <div key={day + time} style={styles.cell}></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    overflow: "auto",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 8,
  },

  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginBottom: 12,
    padding: "6px 0",
  },
  
  arrowButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "32px",
    padding: "4px 10px",
    color: "#9ca3af",
    transition: "0.15s ease",     
  },
  
  scheduleLabel: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#374151",
  },
  

  debugText: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: 6,
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "80px repeat(5, 1fr)",
    width: "100%",
    borderTop: "1px solid #d4d4d8",
    borderLeft: "1px solid #d4d4d8",
    backgroundColor: "#f9fafb",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 24px rgba(15,23,42,0.25)",
  },
  emptyCorner: {
    height: "40px",
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
    backgroundColor: "#f3f4f6",
  },
  
  dayHeader: {
    textAlign: "center",
    fontWeight: 600,
    padding: "10px 0",
    backgroundColor: "#f3f4f6",
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
    color: "#1f2933",
    fontSize: "13px",
    letterSpacing: "0.05em",
  },
  
  timeLabel: {
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #e5e7eb",
    paddingLeft: "10px",
    fontSize: "12px",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  cell: {
    height: "30px",
    borderRight: "1px solid #f3f4f6",
    borderBottom: "1px solid #f3f4f6",
    backgroundColor: "#ffffff",
  },
};
