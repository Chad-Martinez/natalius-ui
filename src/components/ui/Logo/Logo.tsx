import { FC } from 'react';
import logo from '../../../assets/shell.png';
import styles from './Logo.module.css';

type Props = {
  addedStyles?: { [key: string]: string };
  clickHandler?: () => void;
};

const Logo: FC<Props> = ({ addedStyles, clickHandler }): JSX.Element => {
  return (
    <img
      src={logo}
      style={addedStyles}
      className={styles.logo}
      alt='Natalius logo'
      onClick={clickHandler}
    />
  );
};

export default Logo;
