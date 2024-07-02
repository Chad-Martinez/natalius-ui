import { FC } from 'react';
import styles from './Paginator.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

type PaginatorProps = {
  currPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
};

const Paginator: FC<PaginatorProps> = ({
  currPage,
  totalPages,
  handlePrev,
  handleNext,
}): JSX.Element => {
  return (
    <div className={styles.paginatorContainer}>
      <FontAwesomeIcon
        className={currPage === 1 ? styles.faIconDisabled : styles.faIcon}
        icon={faAngleLeft}
        onClick={currPage === 1 ? () => {} : handlePrev}
      />
      <span className={styles.page}>{currPage}</span>
      <FontAwesomeIcon
        className={
          currPage === totalPages ? styles.faIconDisabled : styles.faIcon
        }
        icon={faAngleRight}
        onClick={currPage === totalPages ? () => {} : handleNext}
      />
    </div>
  );
};

export default Paginator;
