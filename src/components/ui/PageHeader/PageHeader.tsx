import { FC } from 'react';
import styles from './PageHeader.module.css';
import { Link } from 'react-router-dom';

type PageHeaderProps = {
  linkLeft?: string;
  linkLeftText?: string;
  linkLeftHandleClick?: () => void;
  linkRight: string;
  linkRightText: string;
  linkRightHandleClick?: () => void;
};

const PageHeader: FC<PageHeaderProps> = ({
  linkLeft,
  linkLeftText,
  linkLeftHandleClick,
  linkRight,
  linkRightText,
  linkRightHandleClick,
}): JSX.Element => {
  return (
    <div className={styles.links}>
      <Link
        className={styles.link}
        to={linkLeft || ''}
        onClick={linkLeftHandleClick}
      >
        {linkLeftText}
      </Link>
      <Link
        className={styles.link}
        to={linkRight}
        onClick={linkRightHandleClick}
      >
        {linkRightText}
      </Link>
    </div>
  );
};

export default PageHeader;
