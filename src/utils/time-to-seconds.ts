export function timeToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}
