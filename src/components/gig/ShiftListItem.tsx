import { FC } from 'react';
import { Shift } from '../../types/Shift';
import EditDeleteBtnGroup from '../ui/EditDeleteBtnGroup';

const ShiftListItem: FC<{ shift: Shift }> = ({ shift }): JSX.Element => {
  return (
    <tr>
      <td>{shift.startDate.slice(0, 10)}</td>
      <td>{shift.startTime.slice(1)}</td>
      <td>{shift.endTime.slice(1)}</td>
      <td>
        <EditDeleteBtnGroup />
      </td>
    </tr>
  );
};

export default ShiftListItem;
