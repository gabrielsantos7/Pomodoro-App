import { PomodoroTimer } from './components/pomodoro-timer';

export default function App() {
  return (
    <div>
      <PomodoroTimer
        pomodoroTime={50}
        shortRestTime={2}
        longRestTime={20}
        cycles={4}
      />
    </div>
  );
}
