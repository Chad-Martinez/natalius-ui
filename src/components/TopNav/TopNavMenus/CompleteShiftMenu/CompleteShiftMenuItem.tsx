import dayjs from 'dayjs';
import { FC, memo } from 'react';
import { IShift } from '../../../../interfaces/IShift.interface';

const CompleteShiftMenuItem: FC<{ shift: IShift }> = memo(({ shift }) => (
  <span style={{ display: 'block' }}>
    {dayjs.utc(shift.start).tz(shift.timezone).format('MMM Do')} - {shift.club}
  </span>
));

export default CompleteShiftMenuItem;
