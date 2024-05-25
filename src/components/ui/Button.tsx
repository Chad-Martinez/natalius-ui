import { FC, SyntheticEvent } from 'react';
import styles from './Button.module.css';

type Props = {
  text: string;
  addedStyles?: { [key: string]: string };
};

const Button: FC<Props> = ({ text, addedStyles }): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };
  return (
    <button className={styles.btn} style={addedStyles} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
