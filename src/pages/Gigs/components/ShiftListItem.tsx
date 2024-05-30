import { FC } from 'react';
import { Shift } from '../../../types/Shift';
import dayjs from 'dayjs';
import styles from './ShiftsList.module.css';
import EditDeleteBtnGroup from '../../../components/ui/EditDeleteBtnGroup';

const ShiftListItem: FC<{ shift: Shift }> = ({ shift }): JSX.Element => {
  return (
    <div className={styles.shiftListItem}>
      <div>
        {dayjs(shift.start).format('ddd: MMM D')} @{' '}
        {dayjs(shift.start).format('h:mma')} -{' '}
        {dayjs(shift.end).format('h:mma')}
      </div>
      <div>{<EditDeleteBtnGroup />}</div>
    </div>
  );
};

export default ShiftListItem;
