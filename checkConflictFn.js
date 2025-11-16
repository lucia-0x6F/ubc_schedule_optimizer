// checkConflictFn.js
import { courseData } from "./coursedata.js";

function timeToMinutes(timeStr) {
  const [hour, min] = timeStr.split(":").map(Number);
  return hour * 60 + min;
}

function timeHasConflict(Start1, End1, Start2, End2) {
  const s1 = timeToMinutes(Start1);
  const e1 = timeToMinutes(End1);
  const s2 = timeToMinutes(Start2);
  const e2 = timeToMinutes(End2);
  return !(e2 <= s1 || s2 >= e1);
}

function dayHasConflict(d1, d2) {
  return d1.some(day => d2.includes(day));
}

function hasConflict(a, b) {
  return dayHasConflict(a.days, b.days) && timeHasConflict(a.start, a.end, b.start, b.end);
}

function checkAllConflicts(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (hasConflict(arr[i], arr[j])) return false;
    }
  }
  return true;
}

function validateSchedule(selected) {
  return checkAllConflicts(selected) ? "Valid schedule!" : "Invalid";
}

export { validateSchedule, checkAllConflicts };
