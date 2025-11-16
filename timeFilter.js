// timeFilter.js

function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function filterByDailyTimeWindow(schedules, minStart, maxEnd) {
  const minStartM = toMinutes(minStart);
  const maxEndM = toMinutes(maxEnd);

  return schedules.filter(schedule => {
    const daily = {};

    for (const sec of schedule) {
      for (const d of sec.days) {
        if (!daily[d]) daily[d] = [];
        daily[d].push(sec);
      }
    }

    for (const day in daily) {
      const earliest = Math.min(...daily[day].map(s => toMinutes(s.start)));
      const latest   = Math.max(...daily[day].map(s => toMinutes(s.end)));

      if (earliest < minStartM || latest > maxEndM) {
        return false;
      }
    }

    return true;
  });
}

export { filterByDailyTimeWindow };