import { FC, PropsWithChildren, SyntheticEvent } from 'react';
import btnStyles from './Button.module.css';

type ButtonProps = {
  text?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  addedStyles?: { [key: string]: string };
  enabled?: boolean;
  loading?: boolean;
  btnStyle: 'primarySolid' | 'primaryOutlined';
  onClick: () => void;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  text,
  type = 'button',
  addedStyles,
  enabled = true,
  loading = false,
  btnStyle,
  onClick,
  children,
}): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    onClick();
  };
  return (
    <button
      type={type}
      className={`${btnStyles.btn} ${
        enabled ? btnStyles[btnStyle] : btnStyles.disabled
      }`}
      disabled={!enabled || loading}
      style={addedStyles}
      onClick={handleClick}
    >
      {loading ? (
        <span className={btnStyles.btnLoading}></span>
      ) : (
        text || children
      )}
    </button>
  );
};

export default Button;
