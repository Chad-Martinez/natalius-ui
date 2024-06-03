import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxArchive,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import styles from './EditDeleteBtnGroup.module.css';

const EditDeleteBtnGroup: FC<{
  archiveBtn?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ archiveBtn = false, onEdit, onDelete }): JSX.Element => {
  return (
    <div className={styles.iconGroup}>
      <FontAwesomeIcon
        className={styles.faIcon}
        icon={faPencil}
        onClick={onEdit}
      />
      <FontAwesomeIcon
        className={styles.faIcon}
        icon={archiveBtn ? faBoxArchive : faTrashCan}
        onClick={onDelete}
      />
    </div>
  );
};

export default EditDeleteBtnGroup;
