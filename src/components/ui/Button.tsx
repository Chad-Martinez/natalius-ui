import { FC } from 'react';
import styles from './Button.module.css';

type Props = {
  text: string;
  addedStyles?: { [key: string]: string };
};

const Button: FC<Props> = ({ text, addedStyles }): JSX.Element => {
  return (
    <button className={styles.btn} style={addedStyles}>
      {text}
    </button>
  );
};

export default Button;
