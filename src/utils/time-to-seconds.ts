export function timeToSeconds(time: string): number {
  const [minutes = 0, seconds = 0] = time.split(':');
  return Number(minutes) * 60 + Number(seconds);
}
