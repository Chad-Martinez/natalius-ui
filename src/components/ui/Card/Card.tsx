import { FC, PropsWithChildren } from 'react';
import styles from './Card.module.css';

const Card: FC<
  PropsWithChildren<{ addedStyles?: { [key: string]: string } }>
> = ({ children, addedStyles }): JSX.Element => {
  return (
    <div className={styles.card} style={addedStyles}>
      {children}
    </div>
  );
};

export default Card;
