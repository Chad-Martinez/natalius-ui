import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './EditDeleteBtnGroup.module.css';

const EditDeleteBtnGroup: FC = (): JSX.Element => {
  return (
    <div className={styles.iconGroup}>
      <FontAwesomeIcon className={styles.faIcon} icon={faPencil} />
      <FontAwesomeIcon className={styles.faIcon} icon={faTrashCan} />
    </div>
  );
};

export default EditDeleteBtnGroup;
