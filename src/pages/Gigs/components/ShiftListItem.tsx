import { FC, useRef } from 'react';
import dayjs from 'dayjs';
import styles from './ShiftListItem.module.css';
import Modal from '../../../components/ui/Modal/Modal';
import { IHTMLDialogElement } from '../../../interfaces/IHTMLDialog.interface';
import { IShift } from '../../../interfaces/IShift.interface';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faPencil,
  faSackDollar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const ShiftListItem: FC<{
  shift: IShift;
  handleDelete: (payload: {
    shiftId: IShift['_id'];
    gigId: IShift['gigId'];
  }) => Promise<void>;
}> = ({ shift, handleDelete }): JSX.Element => {
  const dialogRef = useRef<IHTMLDialogElement | null>(null);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`shift-form/${shift.gigId}`, { state: { shift } });
  };

  const handleIncome = () => {
    if (shift.incomeReported) return;
    navigate('/income/income-form', { state: { shift } });
  };

  const openModal = (): void => {
    dialogRef.current?.openModal();
  };

  const deleteShift = (): void => {
    const payload: { shiftId: IShift['_id']; gigId: IShift['gigId'] } = {
      shiftId: shift._id,
      gigId: shift.gigId,
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
              shift.incomeReported ? styles.faIconSuccess : ''
            } ${shift.incomeReported ? styles.faIconSuccess : ''} ${
              shift.incomeReported ? styles.incomeReported : ''
            }`}
            icon={shift.incomeReported ? faSackDollar : faDollarSign}
            onClick={handleIncome}
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
