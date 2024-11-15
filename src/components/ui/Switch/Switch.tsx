import { ChangeEvent, FC } from 'react';
import styles from './Switch.module.css';

type SwitchProps = {
  name?: string;
  isChecked: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Switch: FC<SwitchProps> = ({
  name,
  isChecked,
  handleChange,
}): JSX.Element => {
  return (
    <label className={styles.switch}>
      <input
        name={name}
        checked={isChecked}
        type='checkbox'
        onChange={handleChange}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default Switch;
