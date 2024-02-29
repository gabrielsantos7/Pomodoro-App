import { ChangeEvent, useState } from 'react';
import { ModalInputProps } from '../models';

export function CyclesInput(props: ModalInputProps) {
  const [cycles, setCycles] = useState(props.value);

  const handleCyclesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCycles(value);
    props.onChange(value);
  };

  return (
    <>
      <div className="grid grid-cols-2 place-items-center gap-8 py-1 px-3">
        <p className="text-sm font-medium text-gray-700 dark:text-slate-50 text-center">
          {props.title}
        </p>
        <div
          className={`mx-auto w-36 flex items-center justify-center border-t border-b ${props.errorMessage ? 'border-red-400' : 'border-gray-300'}`}
        >
          <input
            value={cycles}
            type="number"
            min="1"
            max="59"
            onChange={handleCyclesChange}
            className="w-16 px-3 py-2 border-none placeholder-gray-400 focus:outline-none sm:text-sm bg-transparent dark:text-slate-50"
            required
          />
        </div>
      </div>
      {props.errorMessage && (
        <p className="text-red-400 text-center text-sm pb-2">{props.errorMessage}</p>
      )}
    </>
  );
}
