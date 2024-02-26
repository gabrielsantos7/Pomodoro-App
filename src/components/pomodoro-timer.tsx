import { useEffect, useState, useCallback } from 'react';

import { PomodoroTimerProps } from '../models';
import { ActiveTheme, themeColors } from '../types';
import { useInterval } from '../hooks/useInterval';

import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';
import { Button } from './button';
import { TimerCard } from './timer';

import { secondsToTime } from '../utils/seconds-to-time';
import { Pause, Play, TimerOff, Timer, History } from 'lucide-react';
import { ThemeToggler } from './theme-toggler';

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
  const [activeTheme, setActiveTheme] = useState<ActiveTheme>(() => {
    const savedTheme = localStorage.getItem('theme') as ActiveTheme;
    return savedTheme in themeColors ? savedTheme : 'light';
  });

  let totalSeconds: number;
  if (cycles <= 0) {
    totalSeconds = props.longRestTime;
  } else if (resting) {
    totalSeconds = props.shortRestTime;
  } else {
    totalSeconds = props.pomodoroTime;
  }
  const runningTime = totalSeconds - mainTime;
  const percentage = Math.floor((runningTime / totalSeconds) * 100);

  const configureWorking = useCallback(() => {
    const bellStartAudio = new Audio(bellStart);
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    bellStartAudio.play();
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

  // TODO: Change to a gradient
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
    <div className="container bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-slate-50 mx-auto my-6 p-5 text-center max-w-150 rounded-md  shadow-container">
      <ThemeToggler setActiveTheme={setActiveTheme} />
      <h3 className="text-2xl">
        {!working && !resting
          ? 'Pomodoro não iniciado'
          : working
            ? 'Você está trabalhando'
            : 'Você está descansando'}
      </h3>
      <TimerCard
        mainTime={mainTime}
        percentage={percentage}
        activeTheme={activeTheme}
      />
      <div className="flex items-center justify-evenly py-4">
        <Button
          icon={
            working ? <History strokeWidth={2.5} /> : <Play strokeWidth={2.5} />
          }
          className={working ? 'bg-orange-400' : 'bg-teal-400'}
          onClick={configureWorking}
        />
        <Button
          icon={<Pause strokeWidth={2.5} />}
          className={working ? 'bg-orange-400' : 'bg-teal-400'}
          onClick={() => configureResting(false)}
        />
        {(working || resting) && (
          <Button
            icon={
              timeCounting ? (
                <TimerOff strokeWidth={2.5} />
              ) : (
                <Timer strokeWidth={2.5} />
              )
            }
            className={working ? 'bg-orange-400' : 'bg-teal-400'}
            onClick={() => setTimeCounting((prev) => !prev)}
          />
        )}
      </div>

      {!timeCounting && (resting || working) && (
        <span className="text-center font-bold uppercase bg-red-700 text-white px-1 rounded-md">
          Pausado
        </span>
      )}

      <div className="text-left">
        <p className="">
          Ciclos completos: <span className="font-bold">{completedCycles}</span>
        </p>
        <p className="">
          Horas trabalhadas:{' '}
          <span className="font-bold">
            {secondsToTime(fullWorkingTime, '00:')}
          </span>
        </p>
        <p className="">
          Pomodoros completos:{' '}
          <span className="font-bold">{completedPomodoros}</span>
        </p>
      </div>
    </div>
  );
}
