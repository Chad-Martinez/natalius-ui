import { FC, MouseEvent } from 'react';
import styles from '../../styles/Button.module.css';

type Props = {
  text: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  enabled?: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<Props> = ({
  text,
  type = 'button',
  enabled = true,
  handleClick,
}): JSX.Element => {
  return (
    <button
      disabled={!enabled}
      type={type}
      onClick={handleClick}
      className={`${styles.btn} ${
        !enabled ? styles.btnDisabled : styles.btnEnabled
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
