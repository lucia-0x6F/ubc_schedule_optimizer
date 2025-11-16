import React, { useState } from "react";
import ScheduleGrid from "./ScheduleGrid.jsx"; // ⬅️ calendar grid

const UBC_COURSES = [
  // CPSC
  "CPSC 100", "CPSC 103", "CPSC 107", "CPSC 110", "CPSC 121",
  "CPSC 210", "CPSC 213", "CPSC 221", "CPSC 259", "CPSC 304",
  "CPSC 310", "CPSC 311", "CPSC 312", "CPSC 313", "CPSC 314",
  "CPSC 317", "CPSC 319", "CPSC 320", "CPSC 322", "CPSC 330",
  "CPSC 340", "CPSC 344",

  // MATH
  "MATH 100", "MATH 101", "MATH 102", "MATH 103",
  "MATH 104", "MATH 105", "MATH 110", "MATH 200",
  "MATH 215", "MATH 221",

  // STAT
  "STAT 200", "STAT 201", "STAT 203", "STAT 241",

  // BIOL / CHEM
  "BIOL 111", "BIOL 112", "BIOL 121",
  "CHEM 121", "CHEM 123",

  // SCIE
  "SCIE 113",
];

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [hovered, setHovered] = useState(null);

  const filteredCourses = UBC_COURSES.filter((course) =>
    course.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCourse = (course) => {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
    }
    setQuery("");
  };

  const handleRemoveCourse = (courseToRemove) => {
    setSelectedCourses(selectedCourses.filter((c) => c !== courseToRemove));
  };

  return (
    <div style={styles.page}>
      {/* LEFT column */}
      <div style={styles.leftColumn}>

        {/* Search bar */}
        <div style={styles.searchWrapper}>
          <span style={styles.icon}>🔍</span>
          <input
            type="text"
            placeholder="Search UBC courses (e.g. CPSC 110)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Search results */}
        {query !== "" && (
          <ul style={styles.resultsList}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <li
                  key={course}
                  style={styles.resultItem}
                  onClick={() => handleSelectCourse(course)}
                >
                  {course}
                </li>
              ))
            ) : (
              <li style={styles.noResult}>No matching course found</li>
            )}
          </ul>
        )}

        {/* Selected courses */}
        {selectedCourses.length > 0 && (
          <div style={styles.selectedWrapper}>
            <div style={styles.selectedTitle}>Selected courses</div>
            <div style={styles.selectedList}>
              {selectedCourses.map((course) => (
                <div key={course} style={styles.selectedChip}>
                  <span>{course}</span>

                  {/* delete button */}
                  <button
                    type="button"
                    style={{
                      ...styles.deleteButton,
                      color: hovered === course ? "red" : "white",
                      fontWeight: hovered === course ? 700 : 400,
                    }}
                    onMouseEnter={() => setHovered(course)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleRemoveCourse(course)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* RIGHT column: schedule grid */}
      <div style={styles.rightColumn}>
        <ScheduleGrid />
      </div>

    </div>
  );
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "24px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "32px",
    background:
      "radial-gradient(circle at top left, #f0f9ff, #fefce8 40%, #f9fafb 80%)", // soft background
    minHeight: "calc(100vh - 60px)",
  },

  leftColumn: {
    flex: "0 0 360px",
    background: "transparent",   // ⭐ removes the rectangle completely
    padding: "0px",
    boxShadow: "none",
    border: "none",
  },
  

  rightColumn: {
    flex: 1,
    minHeight: "400px",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    padding: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    backdropFilter: "blur(6px)",
  },

  // Search bar
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px 18px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #f1f5f9, #ffffff)",
    border: "1px solid #d3d3d3",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#333",
  },

  // Search results list
  resultsList: {
    marginTop: "10px",
    padding: "4px 0",
    listStyle: "none",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 20px rgba(15,23,42,0.15)",
    maxHeight: "220px",
    overflowY: "auto",
  },
  resultItem: {
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid #f1f1f1",
  },
  noResult: {
    padding: "8px 14px",
    fontSize: "14px",
    color: "#888",
  },

  // Selected courses section
  selectedWrapper: {
    marginTop: "18px",
  },
  selectedTitle: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "16px",
  },
  selectedList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  selectedChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg, #3B82F6, #22C55E)",             // colorful chip
    color: "#ffffff",
    fontSize: "13px",
    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.35)",
  },
  deleteButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    padding: 0,
    lineHeight: 1,
  },
};
