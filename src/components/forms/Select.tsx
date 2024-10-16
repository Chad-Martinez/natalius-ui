import { ChangeEvent, FC } from 'react';
import formStyles from './FormComponents.module.css';
import { Link } from 'react-router-dom';
import { SelectOptions } from '../../types/SelectOptions';

const Select: FC<{
  options: SelectOptions[] | undefined;
  name: string;
  defaultOptionName?: string;
  value: string;
  hasError?: boolean;
  errorMessage?: string;
  link?: string;
  linkText?: string;
  autoFocus?: boolean;
  handleLinkClick?: () => void;
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
  autoFocus = false,
  handleLinkClick,
  handleChange,
  handleBlur,
}): JSX.Element => {
  return (
    <div className={formStyles.inputContainer}>
      <select
        className={formStyles.input}
        name={name}
        value={value}
        autoFocus={autoFocus}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {defaultOptionName && (
          <option className={formStyles.option} disabled value=''>
            Select a {defaultOptionName}
          </option>
        )}
        {options && options.length > 0
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
      {linkText && (
        <div className={formStyles.linkContainer} onClick={handleLinkClick}>
          <Link className={formStyles.link} to={link || ''}>
            {linkText}
          </Link>
        </div>
      )}
      <div className={formStyles.inputError}>{hasError && errorMessage}</div>
    </div>
  );
};

export default Select;
