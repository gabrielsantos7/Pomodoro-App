import { Pencil, X } from 'lucide-react';
import { PomodoroModalProps } from '../models';
import { FormEvent, useState } from 'react';
import { secondsToTime } from '../utils/seconds-to-time';
import { TimeInput } from './time-input';
import { CyclesInput } from './cycles-input';
import { timeToSeconds } from '../utils/time-to-seconds';

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
    props.onSubmit({
      pomodoroTime: timeToSeconds(pomodoroTime),
      shortRestTime: timeToSeconds(shortRestTime),
      longRestTime: timeToSeconds(longRestTime),
      cycles: cycles
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 w-96 max-w-full shadow-lg transform transition-all duration-700 z-50">
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
              title="Trabalhando"
              value={pomodoroTime}
              onChange={handlePomodoroTimeChange}
            />
            <TimeInput
              title="Descanso curto"
              value={shortRestTime}
              onChange={handleShortTimeChange}
            />
            <TimeInput
              title="Descanso longo"
              value={longRestTime}
              onChange={handleLongTimeChange}
            />
            <CyclesInput
              title="Ciclos"
              value={String(cycles)}
              onChange={handleCyclesChange}
            />
            <button
              type="submit"
              className="mt-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-md font-bold text-xl text-white w-full"
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
