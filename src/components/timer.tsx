import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { TimerProps } from '../models';
import { secondsToTime } from '../utils/seconds-to-time';

// TODO: Correct colors on theme change
export function TimerCard(props: TimerProps) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  return (
    <div className="max-w-64 mx-auto my-4">
      <CircularProgressbar
        value={props.percentage}
        text={secondsToTime(props.mainTime)}
        styles={buildStyles({
          // Text size
          textSize: '20px',

          // Colors
          pathColor: theme === 'light' ? '#0284c7' : '#f43f5e',
          textColor: theme === 'light' ? '#0284c7' : '#f43f5e',
          trailColor: theme === 'light' ? '#d6d6d6' : '#334155'
        })}
      />
    </div>
  );
}
