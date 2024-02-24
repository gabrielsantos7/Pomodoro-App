import { ButtonProps } from '../models';

export function Button(props: ButtonProps) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
