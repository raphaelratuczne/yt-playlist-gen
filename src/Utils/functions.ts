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
    const h = duration
      .replace('PT', '')
      .replace(/(\d+)M/, '')
      .replace(/(\d+)S/, '')
      .replace('H', '');
    const m = duration
      .replace('PT', '')
      .replace(/(\d+)H/, '')
      .replace(/(\d+)S/, '')
      .replace('M', '');
    const s = duration
      .replace('PT', '')
      .replace(/(\d+)H/, '')
      .replace(/(\d+)M/, '')
      .replace('S', '');
    return Number(h) * 60 * 60 + Number(m) * 60 + Number(s);
  }
  return 0;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
