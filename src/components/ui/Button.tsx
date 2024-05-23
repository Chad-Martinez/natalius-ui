import { FC, MouseEvent } from 'react';
import styles from './Button.module.css';

type Props = {
  text: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  enabled?: boolean;
  loading?: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<Props> = ({
  text,
  type = 'button',
  enabled = true,
  loading = false,
  handleClick,
}): JSX.Element => {
  return (
    <button
      disabled={!enabled || loading}
      type={type}
      onClick={handleClick}
      className={`${styles.btn} ${
        !enabled ? styles.btnDisabled : styles.btnEnabled
      }`}
    >
      {loading ? <span className={styles.btnLoading}></span> : text}
    </button>
  );
};

export default Button;
