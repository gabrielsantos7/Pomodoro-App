import { ButtonProps } from '../models';

export function Button(props: ButtonProps) {
  return (
    <button
      className='size-16 bg-slate-300 dark:bg-slate-700 rounded-full text-xl font-bold hover:brightness-75 duration-700 flex justify-center items-center'
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
