import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';

import { TimerProps } from '../models';
import { secondsToTime } from '../utils/seconds-to-time';

export function TimerCard(props: TimerProps) {
  return (
    <div className="max-w-64 mx-auto my-4">
      <CircularProgressbar value={props.percentage} text={secondsToTime(props.mainTime)} styles={buildStyles({

    // Text size
    textSize: '20px',

    // Colors
    pathColor: '#3e98c7',
    textColor: '#3e98c7',
    trailColor: '#d6d6d6',
  })} />
    </div>
  );
}
