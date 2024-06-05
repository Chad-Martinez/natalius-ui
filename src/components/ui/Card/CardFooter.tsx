import { FC } from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const CardFooter: FC<{
  linkLeft?: string;
  linkLeftText?: string;
  linkRight: string;
  linkRightText: string;
}> = ({ linkLeft, linkLeftText, linkRight, linkRightText }): JSX.Element => {
  return (
    <div className={styles.cardFooter}>
      <Link className={styles.cardFooterLink} to={linkLeft || ''}>
        {linkLeftText}
      </Link>
      <Link className={styles.cardFooterLink} to={linkRight}>
        {linkRightText}
      </Link>
    </div>
  );
};

export default CardFooter;
