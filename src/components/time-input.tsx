import { ChangeEvent, useState } from 'react';
import { ModalInputProps } from '../models';

export function TimeInput(props: ModalInputProps) {
  const [minutes, setMinutes] = useState(props.value.split(':')[0]);
  const [seconds, setSeconds] = useState(props.value.split(':')[1]);

  const handleMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newMinutes = event.target.value.slice(0, 2);
    setMinutes(newMinutes);
    props.onChange(`${newMinutes}:${seconds}`);
  };

  const handleSecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSeconds = event.target.value.slice(0, 2);
    setSeconds(newSeconds);
    props.onChange(`${minutes}:${newSeconds}`);
  };

  return (
    <>
    <div className="grid grid-cols-2 place-items-center gap-8 py-1 px-3">
      <p className="text-sm font-medium text-gray-700 dark:text-slate-50 text-center">
        {props.title}
      </p>
      <div className={`mx-auto w-36 flex items-center justify-center border-t border-b ${props.errorMessage ? 'border-red-400' : 'border-gray-300'}`}>
        <input
          value={minutes}
          type="number"
          min="0"
          max="59"
          onChange={handleMinutesChange}
          className="w-16 px-3 py-2 border-none placeholder-gray-400 focus:outline-none sm:text-sm bg-transparent dark:text-slate-50"
          required
        />
        <span className="text-xl text-gray-300 pb-2">:</span>
        <input
          value={seconds}
          type="number"
          min="0"
          max="59"
          onChange={handleSecondsChange}
          className="w-16 px-3 py-2 border-none placeholder-gray-400 focus:outline-none sm:text-sm bg-transparent dark:text-slate-50"
          required
        />
      </div>
    </div>
    {props.errorMessage && (
      <p className='text-red-400 text-center text-sm pb-2'>{props.errorMessage}</p>
    )}
    </>
  );
}
