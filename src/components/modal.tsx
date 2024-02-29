import { Pencil, X } from 'lucide-react';
import { PomodoroModalProps } from '../models';
import { FormEvent, useState } from 'react';
import { secondsToTime } from '../utils/seconds-to-time';
import { TimeInput } from './time-input';
import { CyclesInput } from './cycles-input';
import { timeToSeconds } from '../utils/time-to-seconds';
import { timeIsValid } from '../utils/time-is-valid';
import { ValidationErrorMessage } from '../types';

export function Modal(props: PomodoroModalProps) {
  const [pomodoroTime, setPomodoroTime] = useState(
    secondsToTime(props.pomodoroTime)
  );
  const [shortRestTime, setShortRestTime] = useState(
    secondsToTime(props.shortRestTime)
  );
  const [longRestTime, setLongRestTime] = useState(
    secondsToTime(props.longRestTime)
  );
  const [cycles, setCycles] = useState(props.cycles);

  const [pomodoroErrorMessage, setPomodoroErrorMessage] =
    useState<ValidationErrorMessage>(null);
  const [shortRestErrorMessage, setShortRestErrorMessage] =
    useState<ValidationErrorMessage>(null);
  const [longRestErrorMessage, setLongRestErrorMessage] =
    useState<ValidationErrorMessage>(null);
  const [cyclesErrorMessage, setCyclesErrorMessage] =
    useState<ValidationErrorMessage>(null);

  const [pulse, setPulse] = useState(false);

  const handlePomodoroTimeChange = (newValue: string) => {
    setPomodoroTime(newValue);
  };

  const handleShortTimeChange = (newValue: string) => {
    setShortRestTime(newValue);
  };

  const handleLongTimeChange = (newValue: string) => {
    setLongRestTime(newValue);
  };

  const handleCyclesChange = (newValue: string) => {
    setCycles(Number(newValue));
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const pomodoroValidationResult = timeIsValid(pomodoroTime);
    if (!pomodoroValidationResult.isValid) {
      setPomodoroErrorMessage(pomodoroValidationResult.errorMessage);
      return;
    } else {
      setPomodoroErrorMessage(null);
    }

    const shortRestValidationResult = timeIsValid(shortRestTime);
    if (!shortRestValidationResult.isValid) {
      setShortRestErrorMessage(shortRestValidationResult.errorMessage);
      return;
    } else {
      setShortRestErrorMessage(null);
    }

    const longRestValidationResult = timeIsValid(longRestTime);
    if (!longRestValidationResult.isValid) {
      setLongRestErrorMessage(longRestValidationResult.errorMessage);
      return;
    } else {
      setLongRestErrorMessage(null);
    }

    if (cycles > 99 || cycles <= 0) {
      setCyclesErrorMessage(
        'Erro nos ciclos: o valor deve estar entre 1 e 99.'
      );
      return;
    } else {
      setCyclesErrorMessage(null);
    }

    props.onSubmit({
      pomodoroTime: timeToSeconds(pomodoroTime),
      shortRestTime: timeToSeconds(shortRestTime),
      longRestTime: timeToSeconds(longRestTime),
      cycles: cycles
    });

    // Salvar os dados no localStorage, se necessário
    // TODO: Adicionar lógica para salvar no localStorage
  };

  const handlePulse = () => {
    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, 1500);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handlePulse}
      className="fixed inset-0 flex items-center justify-center z-40 bg-black/50"
    >
      <div onClick={handleModalClick}
        className={`bg-white dark:bg-slate-800 rounded-lg p-3 w-96 max-w-full shadow-lg transform transition-all duration-700 z-50 ${pulse && 'animate-bounce'}`}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
          <h2 className="text-2xl dark:text-slate-50 font-semibold text-gray-900 flex items-center gap-2">
            Editar intervalos <Pencil size={20} />
          </h2>
          <button
            onClick={() => props.setShowModal(false)}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-slate-50 focus:outline-none"
          >
            <X />
          </button>
        </div>
        {/* Modal Content */}
        <div className="mt-6 space-y-4">
          <form className="py-2 px-3" onSubmit={handleFormSubmit}>
            <TimeInput
              errorMessage={pomodoroErrorMessage}
              title="Trabalhando"
              value={pomodoroTime}
              onChange={handlePomodoroTimeChange}
            />
            <TimeInput
              errorMessage={shortRestErrorMessage}
              title="Descanso curto"
              value={shortRestTime}
              onChange={handleShortTimeChange}
            />
            <TimeInput
              errorMessage={longRestErrorMessage}
              title="Descanso longo"
              value={longRestTime}
              onChange={handleLongTimeChange}
            />
            <CyclesInput
              errorMessage={cyclesErrorMessage}
              title="Ciclos"
              value={String(cycles)}
              onChange={handleCyclesChange}
            />
            <button
              type="submit"
              className="mt-4 py-2  rounded-md font-bold text-xl bg-neutral w-full"
            >
              Salvar
            </button>
          </form>
        </div>
        {/* Additional Information */}
        <div className="mt-3 mb-1 text-sm text-gray-500 text-center">
          <p>
            Fique tranquilo, as informações continuarão salvas mesmo se você
            sair do site ou fechar o navegador. 😉
          </p>
        </div>
      </div>
    </div>
  );
}
