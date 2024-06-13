import { FC } from 'react';
import Card from '../../../components/ui/Card/Card';
import CardHeader from '../../../components/ui/Card/CardHeader';
import CardContent from '../../../components/ui/Card/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from '../../../styles/Widget.module.css';
import CardFooter from '../../../components/ui/Card/CardFooter';
import ShiftsList from '../../Gigs/components/ShiftsList';
import { IShift } from '../../../interfaces/IShift.interface';
import CardContentVacant from '../../../components/ui/Card/CardContentVacant';

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
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        {shifts && shifts.length > 0 ? (
          <ShiftsList shiftData={shifts} />
        ) : (
          <CardContentVacant title='No Scheduled Shifts' />
        )}
      </CardContent>
      <CardFooter linkRight='/gigs/shift-form' linkRightText='Add Shift' />
    </Card>
  );
};

export default UpcomingShiftsWidget;
