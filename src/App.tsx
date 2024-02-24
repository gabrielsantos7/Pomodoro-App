import PomodoroTimer from './components/pomodoro-timer';

export default function App() {
  return (
    <div>
      <PomodoroTimer defaultPomodoroTime={600} />
    </div>
  );
}
