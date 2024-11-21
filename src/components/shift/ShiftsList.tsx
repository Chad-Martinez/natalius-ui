import {
  FC,
  useRef,
  useState,
  useEffect,
  ReactElement,
  SyntheticEvent,
} from 'react';
import { AxiosError } from 'axios';
import Modal from '../ui/Modal/Modal';
import {
  faPencil,
  faTrashCan,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import ShiftListItem from './ShiftListItem';
import styles from './ShiftsList.module.css';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../helpers/toast-helpers';
import { deleteShift } from '../../services/shiftServices';
import { IShift } from '../../interfaces/IShift.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';
import { faCircleCheck as farCircleCheck } from '@fortawesome/free-regular-svg-icons';

type ShiftListProps = {
  shiftData: IShift[];
};

type MenuRefs = {
  [key: string]: { closeMenu?: () => void } | null;
};

const ShiftsList: FC<ShiftListProps> = ({ shiftData }): JSX.Element => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [shift, setShift] = useState<IShift | null>(null);

  const menuRefs = useRef<MenuRefs>({});
  const dialogRef = useRef<IHTMLDialogElement | null>(null);

  const closeAllMenus = (): void => {
    Object.values(menuRefs.current).forEach(
      (ref) => ref?.closeMenu && ref?.closeMenu()
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (shiftData) {
      setShifts(shiftData);
    }
  }, [shiftData]);

  const openModal = (event: SyntheticEvent): void => {
    event.stopPropagation();
    dialogRef.current?.openModal();
    closeAllMenus();
  };

  const handleCompleteShift = (): void =>
    navigate(`/shifts/complete-shift/${shift?._id}`);

  const handleEdit = (event: SyntheticEvent): void => {
    event.stopPropagation();
    navigate(`/shifts/shift-form/`, { state: { shift } });
  };

  const handleDelete = async (): Promise<void> => {
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

  const PopupMenuItems: ReactElement = (
    <>
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
    </>
  );

  const mappedShifts: JSX.Element[] = shifts.map((shift) => (
    <ShiftListItem
      key={shift._id}
      shift={shift}
      menuItems={PopupMenuItems}
      setShift={setShift}
      ref={(el) => {
        if (el) {
          menuRefs.current[shift._id] = el;
        } else {
          delete menuRefs.current[shift._id];
        }
      }}
    />
  ));
  return (
    <>
      <Modal
        ref={dialogRef}
        title='Delete Shift'
        subtitle='This action cannot be undone'
        onConfirm={handleDelete}
      />
      <div className={styles.shiftList}>
        {shifts.length > 0 ? mappedShifts : ''}
      </div>
    </>
  );
};

export default ShiftsList;
