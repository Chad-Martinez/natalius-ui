import { ChangeEvent, FC } from 'react';
import formStyles from './FormComponents.module.css';
import { Link } from 'react-router-dom';
import { SelectOptions } from '../../types/SelectOptions';

const Select: FC<{
  options: SelectOptions[] | undefined;
  name: string;
  defaultOptionName: string;
  value: string;
  hasError?: boolean;
  errorMessage?: string;
  link?: string;
  linkText?: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleBlur?: () => void;
}> = ({
  options,
  name,
  defaultOptionName,
  value,
  hasError,
  errorMessage,
  link,
  linkText,
  handleChange,
  handleBlur,
}): JSX.Element => {
  return (
    <div className={formStyles.inputContainer}>
      <select
        className={formStyles.input}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option className={formStyles.option} disabled value=''>
          Select a {defaultOptionName}
        </option>
        {options
          ? options.map((option) => (
              <option
                key={option._id}
                className={formStyles.option}
                id={option._id}
                value={option._id}
              >
                {option.name}
              </option>
            ))
          : ''}
      </select>
      {link && (
        <div className={formStyles.linkContainer}>
          <Link className={formStyles.link} to={link}>
            {linkText}
          </Link>
        </div>
      )}
      <div className={formStyles.inputError}>{hasError && errorMessage}</div>
    </div>
  );
};

export default Select;
