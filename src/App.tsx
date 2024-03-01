import { useState } from 'react';
import { Modal } from './components/modal';
import { PomodoroTimer } from './components/pomodoro-timer';
import { OnSubmitProps } from './models';

export default function App() {
  const savedPomodoroPropsString = localStorage.getItem('pomodoroProps');
  const savedPomodoroProps = savedPomodoroPropsString
    ? JSON.parse(savedPomodoroPropsString)
    : {
        pomodoroTime: 1500,
        shortRestTime: 300,
        longRestTime: 900,
        cycles: 4
      };

  const [showModal, setShowModal] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(
    savedPomodoroProps.pomodoroTime
  );
  const [shortRestTime, setShortRestTime] = useState(
    savedPomodoroProps.shortRestTime
  );
  const [longRestTime, setLongRestTime] = useState(
    savedPomodoroProps.longRestTime
  );
  const [cycles, setCycles] = useState(savedPomodoroProps.cycles);

  const onSubmit = (onSubmitProps: OnSubmitProps) => {
    setPomodoroTime(onSubmitProps.pomodoroTime);
    localStorage.setItem(
      'pomodoroProps',
      JSON.stringify({
        pomodoroTime : onSubmitProps.pomodoroTime,
        shortRestTime : onSubmitProps.shortRestTime,
        longRestTime : onSubmitProps.longRestTime,
        cycles: onSubmitProps.cycles
      })
    );
    setShortRestTime(onSubmitProps.shortRestTime);
    setLongRestTime(onSubmitProps.longRestTime);
    setCycles(onSubmitProps.cycles);
    setShowModal(false);
  };

  return (
    <>
      <PomodoroTimer
        pomodoroTime={pomodoroTime}
        shortRestTime={shortRestTime}
        longRestTime={longRestTime}
        cycles={cycles}
        setShowModal={setShowModal}
      />
      {savedPomodoroPropsString}
      {showModal && (
        <Modal
          pomodoroTime={pomodoroTime}
          onSubmit={onSubmit}
          shortRestTime={shortRestTime}
          longRestTime={longRestTime}
          cycles={cycles}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
