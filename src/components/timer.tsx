import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { themeColors } from '../types';
import { TimerProps } from '../models';
import { secondsToTime } from '../utils/seconds-to-time';

// TODO: Correct colors on theme change
export function TimerCard(props: TimerProps) {

  return (
    <div className="max-w-64 mx-auto my-4 font-sans">
      <CircularProgressbar
        value={props.percentage}
        text={secondsToTime(props.mainTime)}
        styles={buildStyles({
          // Text size
          textSize: '20px',

          // Colors
          pathColor: themeColors[props.activeTheme].primary,
          textColor: themeColors[props.activeTheme].primary,
          trailColor: themeColors[props.activeTheme].background
        })}
      />
    </div>
  );
}
