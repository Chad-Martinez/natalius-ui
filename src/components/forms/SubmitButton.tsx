import { FC, MouseEvent } from 'react';
import styles from './SubmitButton.module.css';

type Props = {
  text: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  enabled?: boolean;
  loading?: boolean;
  addedStyles?: { [key: string]: string };
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const SubmitButton: FC<Props> = ({
  text,
  type = 'button',
  enabled = true,
  loading = false,
  addedStyles,
  handleClick,
}): JSX.Element => {
  return (
    <button
      style={addedStyles}
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

export default SubmitButton;
