// coursePreferred.js
function toMinutes(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }
  
  function preferredTimeScore(schedule, preferredMap) {
    let score = 0;
  
    for (const sec of schedule) {
      if (!preferredMap[sec.name]) continue;
      
      const pref = preferredMap[sec.name];
      const prefStart = toMinutes(pref.start);
      const prefEnd   = toMinutes(pref.end);
      const secStart  = toMinutes(sec.start);
      const secEnd    = toMinutes(sec.end);
  
      if (secStart >= prefStart && secEnd <= prefEnd) {
        score += 10;
      }
      else if (secEnd > prefStart && secStart < prefEnd) {
        score += 5;
      }
      else {
        score -= 5;
      }
    }
  
    return score;
  }
  
  export { preferredTimeScore };
  