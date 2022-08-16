export function convertDuration(duration: string) {
  if (duration) {
    return duration
      .replace('PT', '')
      .replace(/(\d+)M/, '$1:')
      .replace(/(\d+)S/, '$1');
  }
  return duration;
}

export function convertDurationToNumber(duration: string) {
  if (duration) {
    const m = duration
      .replace('PT', '')
      .replace(/(\d+)S/, '')
      .replace('M', '');
    const s = duration
      .replace('PT', '')
      .replace(/(\d+)M/, '')
      .replace('S', '');
    return Number(m) * 60 + Number(s);
  }
  return 0;
}
