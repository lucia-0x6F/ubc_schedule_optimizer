import React from "react";

export default function ScheduleGrid() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  // 8:00–21:00 with 30-min steps
  const times = [];
  for (let hour = 8; hour <= 21; hour++) {
    times.push(`${hour}:00`);
    if (hour !== 21) times.push(`${hour}:30`);
  }

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {/* top-left empty corner */}
        <div style={styles.emptyCorner}></div>

        {/* day headers */}
        {days.map((day) => (
          <div key={day} style={styles.dayHeader}>
            {day}
          </div>
        ))}

        {/* time labels + cells */}
        {times.map((time) => (
          <React.Fragment key={time}>
            {/* time column (color only on full hours) */}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "80px repeat(5, 1fr)", // time column + 5 days
    width: "100%",
    borderTop: "1px solid #d4d4d8",
    borderLeft: "1px solid #d4d4d8",
    backgroundColor: "#ffffff",
  },
  emptyCorner: {
    height: "40px",
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
    backgroundColor: "#e5f0ff", // same as day header for a clean top band
  },
  dayHeader: {
    textAlign: "center",
    fontWeight: 600,
    padding: "10px 0",
    borderRight: "1px solid #d4d4d8",
    borderBottom: "1px solid #d4d4d8",
    backgroundColor: "#e5f0ff",   // soft blue
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
    backgroundColor: "#f3f4f6",   // light grey strip for time column
  },
  cell: {
    height: "30px",               // 30 min = 30px
    borderRight: "1px solid #f3f4f6",
    borderBottom: "1px solid #f3f4f6",
    backgroundColor: "#ffffff",   // keep neutral so course blocks stand out
  },
};
