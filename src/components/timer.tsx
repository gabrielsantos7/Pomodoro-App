import { TimerProps } from "../models";
import { secondsToTime } from "../utils/seconds-to-time";

export function Timer(props: TimerProps) {
  return(
    <div>
      <h1 className="text-5xl text-lime-500 pb-2">{secondsToTime(props.mainTime)}</h1>
    </div>
  );
}
