import { ButtonProps } from '../models';

export function Button(props: ButtonProps) {
  return (
    <button
      className={`${props.className} py-2 px-6 text-xl font-bold hover:brightness-75 duration-700`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
