import { Dispatch, SetStateAction } from 'react';
import { ActiveTheme } from './types';

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
  activeTheme: ActiveTheme;
}

export interface ThemeTogglerProps {
  setActiveTheme: Dispatch<SetStateAction<ActiveTheme>>;
}
