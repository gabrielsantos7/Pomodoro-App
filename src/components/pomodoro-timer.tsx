import { useEffect, useState, useCallback } from 'react';

import { EmptyOrDoubleZero, PomodoroTimerProps } from '../models';
import { useInterval } from '../hooks/useInterval';

import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';
import { Button } from './button';
import { Timer } from './timer';

import { secondsToTime } from '../utils/seconds-to-time';

const bodyClassList = document.body.classList;

export function PomodoroTimer(props: PomodoroTimerProps) {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [cycles, setCycles] = useState(props.cycles - 1);

  const [timeCounting, setTimeCounting] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  const configureWorking = useCallback(() => {

  const bellStartAudio = new Audio(bellStart);
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    bellStartAudio.play()
  }, [props.pomodoroTime]);

  const configureResting = useCallback(
    (longPause: boolean) => {
      const bellFinishAudio = new Audio(bellFinish);
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      setMainTime(longPause ? props.longRestTime : props.shortRestTime);
      bellFinishAudio.play();
    },
    [props.longRestTime, props.shortRestTime]
  );

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime((prev) => prev + 1);
    },
    timeCounting ? 1000 : null
  );

  useEffect(() => {
    if (working) {
      bodyClassList.remove('bg-teal-400');
      bodyClassList.add('bg-orange-400');
    }
    if (resting) {
      bodyClassList.remove('bg-orange-400');
      bodyClassList.add('bg-teal-400');
    }

    if (mainTime > 0) return;

    if (working && cycles > 0) {
      configureResting(false);
      setCycles((prev) => prev - 1);
    } else if (working && cycles <= 0) {
      configureResting(true);
      setCompletedCycles((prev) => prev + 1);
      setCycles(props.cycles - 1);
    }

    if (working) setCompletedPomodoros((prev) => prev + 1);
    if (resting) configureWorking();
  }, [
    working,
    resting,
    mainTime,
    cycles,
    configureWorking,
    configureResting,
    props.cycles
  ]);

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

      <div className="text-left">
        <p className="">
          Ciclos completos: <span className="font-bold">{completedCycles}</span>
        </p>
        <p className="">
          Horas trabalhadas:{' '}
          <span className="font-bold">{secondsToTime(fullWorkingTime, EmptyOrDoubleZero.DoubleZero)}</span>
        </p>
        <p className="">
          Pomodoros completos:{' '}
          <span className="font-bold">{completedPomodoros}</span>
        </p>
      </div>
    </div>
  );
}
