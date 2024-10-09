import { FC, SyntheticEvent } from 'react';
import dayjs from 'dayjs';
import styles from './ShiftListItem.module.css';
import { IShift } from '../../interfaces/IShift.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const ShiftListItem: FC<{
  shift: IShift;
  handleMenu: (top: number, left: number, income: IShift) => void;
  handleDelete: (payload: {
    shiftId: IShift['_id'];
    clubId: IShift['clubId'];
  }) => Promise<void>;
}> = ({ shift, handleMenu }): JSX.Element => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    const e = {
      ...event,
    } as unknown as PointerEvent;
    handleMenu(e.clientY, e.clientX, shift);
  };

  return (
    <>
      <div className={styles.shiftListItem}>
        <div>
          {dayjs(shift.start).format('ddd: MMM D')} @{' '}
          {dayjs(shift.start).format('h:mma')} -{' '}
          {dayjs(shift.end).format('h:mma')}
        </div>
        <div className={styles.actions} onClick={handleClick}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
      </div>
    </>
  );
};

export default ShiftListItem;
