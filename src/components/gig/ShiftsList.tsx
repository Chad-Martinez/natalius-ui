import { FC } from 'react';
import ShiftListItem from './ShiftListItem';
import { Shift } from '../../types/Shift';
import styles from './ShiftsList.module.css';

const ShiftsList: FC<{ shifts: Shift[] }> = ({ shifts }): JSX.Element => {
  console.log(shifts);
  return (
    <table className={styles.gridContainer}>
      <tr>
        <th>Date</th>
        <th>Start</th>
        <th>End</th>
        <th></th>
      </tr>
      {shifts.length > 0
        ? shifts.map((shift) => <ShiftListItem key={shift._id} shift={shift} />)
        : ''}
    </table>
  );
};

export default ShiftsList;
