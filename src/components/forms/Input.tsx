import { ChangeEvent, FC } from 'react';
import formStyles from '../forms/FormComponents.module.css';

type Props = {
  id?: string;
  name?: string;
  type?: string;
  value: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  hasError?: boolean;
  placeholder?: string;
  errorMessage?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: () => void;
};

const Input: FC<Props> = ({
  id,
  name,
  type = 'text',
  value,
  min,
  max,
  step,
  disabled = false,
  minLength,
  maxLength,
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
        step={step}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
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
