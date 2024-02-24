import { useState } from 'react';
import { PomodoroTimerProps } from '../../models';
import { useInterval } from '../../hooks/useInterval';

export default function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime + 1)
  }, 1000)
  return <div>
    {mainTime}
  </div>;
}
