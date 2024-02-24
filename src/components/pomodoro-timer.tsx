import { useState } from 'react';
import { PomodoroTimerProps } from '../models';
import { useInterval } from '../hooks/useInterval';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';

export function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <div>
      <h2>{secondsToTime(mainTime)}</h2>

      <Button
        text="teste"
        className="px-4 py-2 bg-lime-500"
        onClick={() => alert('Oi')}
      />
    </div>
  );
}
