import { FC } from 'react';
import logo from '../../../assets/shell.png';
import styles from './Logo.module.css';

type Props = {
  addedStyles?: { [key: string]: string };
};

const Logo: FC<Props> = ({ addedStyles }): JSX.Element => {
  return (
    <img
      src={logo}
      style={addedStyles}
      className={styles.logo}
      alt='Natalius logo'
    />
  );
};

export default Logo;
