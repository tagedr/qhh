export function logRotate(logs, newEntry, limit = 10) {
    const nEntry = {
      BODY: newEntry.BODY,
      LEVEL: newEntry.LEVEL,
      date: Date.now()
    };
    if (logs) {
      if (logs.length >= limit) logs.shift();
      return logs.concat(nEntry);
    }
  
    return [nEntry];
  }

