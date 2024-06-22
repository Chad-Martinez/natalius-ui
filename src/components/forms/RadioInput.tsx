import { ChangeEvent, FC } from 'react';
import styles from './FormComponents.module.css';

type RadioInputProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RadioInput: FC<RadioInputProps> = ({
  id,
  name,
  value,
  label,
  defaultChecked,
  handleChange,
}): JSX.Element => {
  return (
    <div>
      <input
        className={styles.radio}
        type='radio'
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        defaultChecked={defaultChecked}
      />
      <label className={styles.radioLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
