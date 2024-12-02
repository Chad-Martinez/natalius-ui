import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FC } from 'react';
import styles from './ConfirmDialog.module.css';

const ConfirmDialog: FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  return (
    <div className={styles.dialogBtnGroup}>
      <form method='dialog'>
        <button>
          <FontAwesomeIcon className={styles.cancelIcon} icon={faCircleXmark} />
        </button>
      </form>
      <button onClick={onConfirm}>
        <FontAwesomeIcon className={styles.confirmIcon} icon={faCircleCheck} />
      </button>
    </div>
  );
};

export default ConfirmDialog;
