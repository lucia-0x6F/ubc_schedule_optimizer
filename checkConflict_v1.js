import {courseData} from "./coursedata.js"
const newArray = Object.values(courseData).flat();

function getUserSelectedCourses() {
  const selected = []; 
  
  while (true) {
      const input = prompt("Enter course name (DONE to stop):");
      if (input === "DONE") break;

      if (courseData[input]) {
          selected.push(...courseData[input]);
      } else {
          console.log("Invalid course name:", input);
      }
  }
  return selected;
}


// UBC classes end 10 mins early so time intervals are open (no equality conflict)
function timeHasConflict(Start1, End1, Start2, End2) {
    const s1 = timeToMinutes(Start1)
    const e1 = timeToMinutes(End1)
    const s2 = timeToMinutes(Start2)
    const e2 = timeToMinutes(End2)
    return !(e2 < s1 || s2 > e1);
}
function timeToMinutes(timeStr) {

    const [hour, min] = timeStr.split(":").map(Number);
    return hour * 60 + min;
  }
  function dayHasConflict(dayArray1, dayArray2) {
    return dayArray1.some(day => dayArray2.includes(day));
  }
  
function hasConflict(course1, course2) {
    return (timeHasConflict(course1.start, course1.end, course2.start, course2.end)
    && dayHasConflict(course1.days, course2.days))

}
function getCourseSections (name){
    return newArray.filter(item => item.name === name)
}

function eachTypeNoConflict(selectedArray) {
  for (let i = 0; i < selectedArray.length; i++) {
    for (let j = i + 1; j < selectedArray.length; j++) {

      if (selectedArray[i].name === selectedArray[j].name &&
          selectedArray[i].type === selectedArray[j].type) {
        return false; 
      }
    }
  }
  return true;
}

if (!eachTypeNoConflict(selectedCourses)) return "Invalid";

if (!hasConflict(selectedCourses)) return "Time conflict exists";

return "Valid schedule";





