import { FC } from 'react';
import ShiftListItem from './ShiftListItem';
import { Shift } from '../../../types/Shift';
import styles from './ShiftsList.module.css';

const ShiftsList: FC<{ shifts: Shift[] }> = ({ shifts }): JSX.Element => {
  return (
    <div className={styles.shiftList}>
      {shifts.length > 0
        ? shifts.map((shift) => <ShiftListItem key={shift._id} shift={shift} />)
        : ''}
    </div>
  );
};

export default ShiftsList;
