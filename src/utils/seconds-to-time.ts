import { EmptyOrDoubleZero } from '../models';

export function secondsToTime(
  seconds: number,
  startsWith: EmptyOrDoubleZero = EmptyOrDoubleZero.Empty
): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${
    hours ? `${hours}:` : `${startsWith}`
  }${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
}
