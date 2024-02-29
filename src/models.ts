import { Dispatch, SetStateAction } from 'react';
import { ActiveTheme } from './types';

export interface AppComponentsProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface PomodoroModalProps extends AppComponentsProps {
  onSubmit: (onSubmitProps: OnSubmitProps) => void;
}

export interface PomodoroTimerProps extends AppComponentsProps {}

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

export interface OnSubmitProps {
  pomodoroTime: number,
  shortRestTime: number,
  longRestTime: number,
  cycles: number
}

export interface ModalInputProps {
  title: string;
  value: string;
  onChange: (newValue: string) => void;
  errorMessage: string | null
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}
