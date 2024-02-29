import { ValidationResult } from "../models";

const MAX_TIME = 59;
const MIN_TIME = 0;

export function timeIsValid(time: string): ValidationResult {
  const timeRegex = /^\d{1,2}:\d{2}$/;
  
  if (!time) {
    return { isValid: false, errorMessage: "O tempo não pode estar vazio." };
  }

  if (!timeRegex.test(time)) {
    return { isValid: false, errorMessage: "Formato de tempo inválido. Use mm:ss" };
  }

  const [minutes, seconds] = time.split(':');

  const minutesValue = Number(minutes);
  const secondsValue = Number(seconds);

  if (minutesValue === MIN_TIME && secondsValue === MIN_TIME) {
    return { isValid: false, errorMessage: "Minutos e segundos não podem estar zerados" };
  }

  if (minutesValue > MAX_TIME || minutesValue < MIN_TIME) {
    return { isValid: false, errorMessage: "Minutos devem estar entre 0 e 59." };
  }

  if (secondsValue > MAX_TIME || secondsValue < MIN_TIME) {
    return { isValid: false, errorMessage: "Segundos devem estar entre 0 e 59." };
  }

  return { isValid: true, errorMessage: null };
}
