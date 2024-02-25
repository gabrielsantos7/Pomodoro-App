export interface PomodoroTimerProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export interface ButtonProps {
  icon: JSX.Element;
  className?: string;
  onClick?: () => void;
}

export interface TimerProps {
  mainTime: number;
  percentage: number;
}

export enum EmptyOrDoubleZero {
  Empty = '',
  DoubleZero = '00:',
}
