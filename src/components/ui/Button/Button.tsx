import { FC, SyntheticEvent } from 'react';
import btnStyles from './Button.module.css';

type Props = {
  text: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  addedStyles?: { [key: string]: string };
  solid?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

const Button: FC<Props> = ({
  text,
  type = 'submit',
  addedStyles,
  solid = false,
  disabled = false,
  loading = false,
  onClick,
}): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    onClick();
  };
  return (
    <button
      type={type}
      className={`${btnStyles.btn} ${
        solid ? btnStyles.btnSolid : btnStyles.btnHallow
      }`}
      disabled={disabled}
      style={addedStyles}
      onClick={handleClick}
    >
      {loading ? <span className={btnStyles.btnLoading}></span> : text}
    </button>
  );
};

export default Button;
