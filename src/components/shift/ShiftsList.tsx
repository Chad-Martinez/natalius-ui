import {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ShiftListItem from './ShiftListItem';
import styles from './ShiftsList.module.css';
import { deleteShift } from '../../services/shiftServices';
import { notify } from '../../utils/toastify';
import { AxiosError } from 'axios';
import { IShift } from '../../interfaces/IShift.interface';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';
import { MenuContext } from '../../layouts/ProtectedLayout';
import Modal from '../ui/Modal/Modal';
import {
  faCircleCheck,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as farCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShiftsList: FC<{
  shiftData: IShift[];
}> = ({ shiftData }): JSX.Element => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [shift, setShift] = useState<IShift>();
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const { showPopup, setShowPopup } = useContext(MenuContext);
  const dialogRef = useRef<IHTMLDialogElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (shiftData) {
      setShifts(shiftData);
    }
  }, [shiftData]);

  const handleMenu = (Y: number, X: number, shift: IShift): void => {
    setShift(shift);
    setTop(Y);
    setLeft(X - 52);
    setShowPopup(true);
  };

  const openModal = (event: SyntheticEvent): void => {
    event.stopPropagation();
    dialogRef.current?.openModal();
  };

  const handleCompleteShift = (): void =>
    navigate(`/complete-shift/${shift?._id}`);

  const handleEdit = (event: SyntheticEvent): void => {
    event.stopPropagation();
    navigate(`/clubs/shift-form/${shift?.clubId}`, { state: { shift } });
    setShowPopup(false);
  };

  const handleDelete = async () => {
    if (shift) {
      try {
        const shiftId = shift._id;
        const clubId = shift.clubId;
        await deleteShift({ shiftId, clubId });

        const filteredShifts = shifts.filter((shift) => shift._id !== shiftId);
        setShifts(filteredShifts);
        notify('Shift deleted', 'success', 'delete-shift-success');
      } catch (error) {
        console.error('Delete Shift Error: ', error);
        if (error instanceof AxiosError)
          notify(error.response?.data.message, 'error', 'delete-shift-error');
      } finally {
        dialogRef.current?.closeModal();
      }
    }
  };
  return (
    <>
      <Modal
        ref={dialogRef}
        title='Delete Shift'
        subtitle='This action cannot be undone'
        onConfirm={handleDelete}
      />
      <ul
        style={{ top: `${top}px`, left: `${left}px` }}
        className={`${styles.ellipsisMenuContainer} ${
          showPopup ? styles.open : ''
        }`}
      >
        <li>
          <FontAwesomeIcon
            className={shift?.shiftComplete ? styles.faIconSuccess : ''}
            icon={shift?.shiftComplete ? faCircleCheck : farCircleCheck}
            onClick={handleCompleteShift}
          />
        </li>
        <li onClick={handleEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </li>
        <li onClick={openModal}>
          <FontAwesomeIcon icon={faTrashCan} />
        </li>
      </ul>
      <div className={styles.shiftList}>
        {shifts.length > 0
          ? shifts.map((shift) => (
              <ShiftListItem
                key={shift._id}
                shift={shift}
                handleDelete={handleDelete}
                handleMenu={handleMenu}
              />
            ))
          : ''}
      </div>
    </>
  );
};

export default ShiftsList;
