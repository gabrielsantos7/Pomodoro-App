export interface PomodoroTimerProps {
  defaultPomodoroTime: number;
}

export interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export interface TimerProps {
  mainTime: number;
}
