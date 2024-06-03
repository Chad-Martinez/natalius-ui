import { FC, useState } from 'react';
import ShiftListItem from './ShiftListItem';
import styles from './ShiftsList.module.css';
import { deleteShift } from '../../../services/shiftServices';
import { notify } from '../../../utils/toastify';
import { AxiosError } from 'axios';
import { IShift } from '../../../interfaces/IShift.interface';

const ShiftsList: FC<{ shiftData: IShift[] }> = ({
  shiftData,
}): JSX.Element => {
  const [shifts, setShifts] = useState<IShift[]>(shiftData);

  const handleDelete = async (payload: {
    shiftId: IShift['_id'];
    gigId: IShift['gigId'];
  }) => {
    try {
      const response = await deleteShift(payload);
      console.log('resposne ', response);
      const filteredShifts = shifts.filter(
        (shift) => shift._id !== payload.shiftId
      );
      setShifts(filteredShifts);
      notify('Shift deleted', 'success', 'delete-shift-success');
    } catch (error) {
      console.error('Delete Shift Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'delete-shift-error');
    }
  };
  return (
    <div className={styles.shiftList}>
      {shifts.length > 0
        ? shifts.map((shift) => (
            <ShiftListItem
              key={shift._id}
              shift={shift}
              handleDelete={handleDelete}
            />
          ))
        : ''}
    </div>
  );
};

export default ShiftsList;
