function generateScheduleArrays() {
    const courseNames = Object.keys(courseData);
    const results = [];
  
    function backtrack(index, current) {
      if (index === courseNames.length) {
        if (validateSchedule(current) === "Valid schedule!") {
          results.push([...current]);
        }
        return;
      }
  
      const courseName = courseNames[index];
      const sections = courseData[courseName];
  
      for (let sec of sections) {
        current.push(sec);
        if (validateSchedule(current) === "Valid schedule!") {
          backtrack(index + 1, current);
        }
        current.pop();
      }
    }
  
    backtrack(0, []);
  
    // Display results in your requested format
    if (results.length === 0) {
      console.log(" No valid schedules found.");
      return;
    }
  
    for (let i = 0; i < results.length; i++) {
      console.log(`\n Schedule Number ${i + 1}`);
      console.log("[");
      for (const sec of results[i]) {
        console.log(`  { name: "${sec.name}", section: "${sec.section}", type: "${sec.type}", days: [${sec.days.map(d => `"${d}"`)}], start: "${sec.start}", end: "${sec.end}", location: "${sec.location}" },`);
      }
      console.log("]");
    }
  
    return results; // if you want to use programmatically
  }
  
  // make available in console
  window.generateScheduleArrays = generateScheduleArrays;
  export { validateSchedule, generateScheduleArrays };
