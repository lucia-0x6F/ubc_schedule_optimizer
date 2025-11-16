function filterByNoClassDays(schedules, noClassDays) {
    const banned = new Set(noClassDays);
  
    return schedules.filter(schedule => {
      for (const sec of schedule) {
        for (const d of sec.days) {
          if (banned.has(d)) {
            return false;
          }
        }
      }
      return true;
    });
  }
  export { filterByNoClassDays };
  