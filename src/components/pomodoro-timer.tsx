import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import { PomodoroTimerProps } from '../models';
import { useInterval } from '../hooks/useInterval';

import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';
import { Button } from './button';
import { Timer } from './timer';

export function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [playBellStart] = useSound(bellStart);
  const [playBellFinish] = useSound(bellFinish);

  const configureWorking = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    playBellStart();
  };

  const configureResting = (longPause: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    setMainTime(longPause ? props.longRestTime : props.shortRestTime);
    playBellFinish();
  };

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null
  );

  useEffect(() => {
    const bodyClassList = document.body.classList;
    if (working) {
      bodyClassList.remove('bg-teal-400');
      bodyClassList.add('bg-orange-400');
    }
    if (resting) {
      bodyClassList.remove('bg-orange-400');
      bodyClassList.add('bg-teal-400');
    }
  }, [working, resting]);

  return (
    <div className="container bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-slate-50 mx-auto my-12 p-5 text-center max-w-150 rounded-md  shadow-container">
      <h3 className="text-2xl">
        Você está {working ? 'trabalhando' : 'descansando'}
      </h3>
      <Timer mainTime={mainTime} />
      <div className="flex items-center justify-evenly py-4">
        <Button
          text="Trabalhar"
          className={working ? 'bg-orange-400' : 'bg-teal-400'}
          onClick={configureWorking}
        />
        <Button
          text="Descansar"
          className={working ? 'bg-orange-400' : 'bg-teal-400'}
          onClick={() => configureResting(false)}
        />
        {(working || resting) && (
          <Button
            text={timeCounting ? 'Pausar' : 'Retomar'}
            className={working ? 'bg-orange-400' : 'bg-teal-400'}
            onClick={() => setTimeCounting((prev) => !prev)}
          />
        )}
      </div>

      <p className="text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quasi
        error quisquam laboriosam rerum
      </p>
    </div>
  );
}
