import React, { useState } from "react";
import CourseSearch from "./CourseSearch.jsx";
import ScheduleGrid from "./ScheduleGrid.jsx";
import { generateScheduleArrays } from "./buildSchedules.js";
import TopBar from "./TopBar.jsx";





export default function App() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);

  function handleBuildSchedules() {
    const results = generateScheduleArrays(selectedCourses);
    setSchedules(results);
  }

  return (
    <div className="app">
      <CourseSearch
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
      />

      <button className="build-button" onClick={handleBuildSchedules}>
        Build Schedules
      </button>

      <ScheduleGrid schedules={schedules} />
    </div>
  );
}
