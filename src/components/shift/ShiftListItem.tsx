import { FC, useRef } from 'react';
import dayjs from 'dayjs';
import styles from './ShiftListItem.module.css';
import Modal from '../ui/Modal/Modal';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';
import { IShift } from '../../interfaces/IShift.interface';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as farCircleCheck } from '@fortawesome/free-regular-svg-icons';

const ShiftListItem: FC<{
  shift: IShift;
  handleDelete: (payload: {
    shiftId: IShift['_id'];
    clubId: IShift['clubId'];
  }) => Promise<void>;
}> = ({ shift, handleDelete }): JSX.Element => {
  const dialogRef = useRef<IHTMLDialogElement | null>(null);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/clubs/shift-form/${shift.clubId}`, { state: { shift } });
  };

  const handleCompleteShift = () => {
    if (shift.shiftComplete) return;
    navigate(`/complete-shift/${shift._id}`);
  };

  const openModal = (): void => {
    dialogRef.current?.openModal();
  };

  const deleteShift = (): void => {
    const payload: { shiftId: IShift['_id']; clubId: IShift['clubId'] } = {
      shiftId: shift._id,
      clubId: shift.clubId,
    };
    handleDelete(payload);
    dialogRef.current?.closeModal();
  };
  return (
    <>
      <Modal
        ref={dialogRef}
        title='Delete Shift?'
        subtitle='This action cannot be undone'
        onConfirm={deleteShift}
      />
      <div className={styles.shiftListItem}>
        <div>
          {dayjs(shift.start).format('ddd: MMM D')} @{' '}
          {dayjs(shift.start).format('h:mma')} -{' '}
          {dayjs(shift.end).format('h:mma')}
        </div>
        <div className={styles.iconGroup}>
          <FontAwesomeIcon
            className={`${styles.faIcon} ${
              shift.shiftComplete ? styles.faIconSuccess : ''
            } ${shift.shiftComplete ? styles.faIconSuccess : ''} ${
              shift.shiftComplete ? styles.shiftComplete : ''
            }`}
            icon={shift.shiftComplete ? faCircleCheck : farCircleCheck}
            onClick={handleCompleteShift}
          />
          <FontAwesomeIcon
            className={styles.faIcon}
            icon={faPencil}
            onClick={handleEdit}
          />
          <FontAwesomeIcon
            className={styles.faIcon}
            icon={faTrashCan}
            onClick={openModal}
          />
        </div>
      </div>
    </>
  );
};

export default ShiftListItem;
