import { generateScheduleArrays } from "./buildSchedules.js";
import { filterByNoClassDays } from "./dayFilter.js";
import { filterByDailyTimeWindow } from "./timeFilter.js";
import { preferredTimeScore } from "./coursePreferred.js";

/**
 * Auto-optimized + Returns Top 5 schedules only
 * @param {Array} selectedCourses 
 * @param {Object} options config
 */
function optimizeSchedules(selectedCourses, options = {}) {
  let results = generateScheduleArrays(selectedCourses);
  console.log("Initial schedules:", results.length);

  // 1️ Filter by forbidden days
  if (options.noClassDays && options.noClassDays.length > 0) {
    results = filterByNoClassDays(results, options.noClassDays);
    console.log("Filtered by day:", results.length);
  }

  // 2️ Filter by daily allowed time window
  if (options.minStart && options.maxEnd) {
    results = filterByDailyTimeWindow(results, options.minStart, options.maxEnd);
    console.log("Filtered by time window:", results.length);
  }

  // 3️ Apply preferred time scoring + sort
  if (options.preferredTimes) {
    results = results
      .map(schedule => ({
        schedule,
        score: preferredTimeScore(schedule, options.preferredTimes)
      }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.schedule);

    console.log("After scoring:", results.length);
  }

  // LIMIT: Return only best top 5
  const top5 = results.slice(0, 5);
  console.log("Final returned:", top5.length);

  return top5;
}

export { optimizeSchedules };
