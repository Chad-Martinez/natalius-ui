import { FC } from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const CardFooter: FC<{
  linkLeft?: string;
  linkLeftText?: string;
  linkLeftHandleClick?: () => void;
  linkRight: string;
  linkRightText: string;
  linkRightHandleClick?: () => void;
}> = ({
  linkLeft,
  linkLeftText,
  linkLeftHandleClick,
  linkRight,
  linkRightText,
  linkRightHandleClick,
}): JSX.Element => {
  return (
    <div className={styles.cardFooter}>
      <Link
        className={styles.cardFooterLink}
        to={linkLeft || ''}
        onClick={linkLeftHandleClick}
      >
        {linkLeftText}
      </Link>
      <Link
        className={styles.cardFooterLink}
        to={linkRight}
        onClick={linkRightHandleClick}
      >
        {linkRightText}
      </Link>
    </div>
  );
};

export default CardFooter;
