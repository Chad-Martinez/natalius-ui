import { ChangeEvent, FC } from 'react';
import formStyles from '../forms/FormComponents.module.css';

type Props = {
  id?: string;
  name?: string;
  type: string;
  value: string;
  min?: string | number;
  max?: string | number;
  hasError?: boolean;
  placeholder?: string;
  errorMessage: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: () => void;
};

const Input: FC<Props> = ({
  id,
  name,
  type,
  value,
  min,
  max,
  hasError,
  placeholder,
  errorMessage,
  handleChange,
  handleBlur,
}): JSX.Element => {
  return (
    <div className={formStyles.inputContainer}>
      <input
        className={formStyles.input}
        id={id}
        name={name}
        type={type}
        min={min}
        max={max}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className={formStyles.inputError}>{hasError && errorMessage}</div>
    </div>
  );
};

export default Input;
