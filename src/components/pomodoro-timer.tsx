import { useState } from 'react';
import { PomodoroTimerProps } from '../models';
import { useInterval } from '../hooks/useInterval';
import { Button } from './button';
import { Timer } from './timer';

export function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <div className="container bg-slate-800 mx-auto my-2 py-2 text-center">
      <Timer mainTime={mainTime} />
      <Button
        text="teste"
        className="px-4 py-2 bg-lime-500"
        onClick={() => alert('Oi')}
      />
    </div>
  );
}
