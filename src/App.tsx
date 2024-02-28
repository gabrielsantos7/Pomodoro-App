import { useState } from 'react';
import { Modal } from './components/modal';
import { PomodoroTimer } from './components/pomodoro-timer';
import { OnSubmitProps } from './models';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(1500);
  const [shortRestTime, setShortRestTime] = useState(300);
  const [longRestTime, setLongRestTime] = useState(900);
  const [cycles, setCycles] = useState(4);

  const onSubmit = (onSubmitProps: OnSubmitProps) => {
    setPomodoroTime(onSubmitProps.pomodoroTime);
    setShortRestTime(onSubmitProps.shortRestTime);
    setLongRestTime(onSubmitProps.longRestTime);
    setCycles(onSubmitProps.cycles);
    console.log(onSubmitProps);
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
