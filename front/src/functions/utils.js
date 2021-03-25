export function logRotate(logs, newEntry, limit = 10) {
    if (!newEntry) return [];
    const nEntry = {
      BODY: newEntry.BODY ? newEntry.BODY : '',
      LEVEL: newEntry.LEVEL? newEntry.LEVEL : 'danger',
      date: Date.now()
    };
    if (logs) {
      if (logs.length >= limit) logs.shift();
      return logs.concat(nEntry);
    }
  
    return [nEntry];
  }

