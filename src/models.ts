export interface PomodoroTimerProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export interface TimerProps {
  mainTime: number;
}

export enum EmptyOrDoubleZero {
  Empty = '',
  DoubleZero = '00:',
}
