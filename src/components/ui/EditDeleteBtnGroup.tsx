import { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxArchive,
  faPencil,
  // faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import styles from './EditDeleteBtnGroup.module.css';
import { ButtonContext } from '../../pages/Gigs/components/GigItem';

const EditDeleteBtnGroup: FC = (): JSX.Element => {
  const { handleModal } = useContext(ButtonContext);
  return (
    <div className={styles.iconGroup}>
      <FontAwesomeIcon className={styles.faIcon} icon={faPencil} />
      <FontAwesomeIcon
        className={styles.faIcon}
        icon={faBoxArchive}
        onClick={handleModal}
      />
    </div>
  );
};

export default EditDeleteBtnGroup;
