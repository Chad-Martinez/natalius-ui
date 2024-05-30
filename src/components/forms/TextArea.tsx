import { ChangeEvent, FC } from 'react';
import formStyles from '../forms/FormComponents.module.css';

type Props = {
  id?: string;
  name?: string;
  cols?: number;
  rows?: number;
  value: string;
  minLength?: number;
  maxLength?: number;
  addedStyles?: { [key: string]: string };
  hasError?: boolean;
  placeholder?: string;
  errorMessage?: string;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur?: () => void;
};

const TextArea: FC<Props> = ({
  id,
  name,
  cols,
  rows,
  value,
  minLength,
  maxLength,
  addedStyles,
  hasError,
  placeholder,
  errorMessage,
  handleChange,
  handleBlur,
}): JSX.Element => {
  return (
    <div className={formStyles.inputContainer}>
      <textarea
        style={addedStyles}
        className={formStyles.textArea}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className={formStyles.inputError}>{hasError && errorMessage}</div>
    </div>
  );
};

export default TextArea;
