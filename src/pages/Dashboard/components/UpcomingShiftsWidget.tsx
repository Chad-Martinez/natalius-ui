import { FC } from 'react';
import Card from '../../../components/ui/Card/Card';
import CardHeader from '../../../components/ui/Card/CardHeader';
import CardContent from '../../../components/ui/Card/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import styles from './UpcomingShiftsWidget.module.css';
import CardFooter from '../../../components/ui/Card/CardFooter';
import ShiftsList from '../../Gigs/components/ShiftsList';
import { IShift } from '../../../interfaces/IShift.interface';

const UpcomingShiftsWidget: FC<{ shifts: IShift[] }> = ({
  shifts,
}): JSX.Element => {
  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text={'Upcoming Shifts'}>
        <FontAwesomeIcon className={styles.faIcon} icon={faGripVertical} />
      </CardHeader>
      <CardContent>
        {shifts.length > 0 ? <ShiftsList shiftData={shifts} /> : ''}
      </CardContent>
      <CardFooter linkRight='/gigs/shift-form' linkRightText='Add Shift' />
    </Card>
  );
};

export default UpcomingShiftsWidget;
