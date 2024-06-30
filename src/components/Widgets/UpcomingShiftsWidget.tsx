import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from './Widget.module.css';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import CardFooter from '../ui/Card/CardFooter';
import { IShift } from '../../interfaces/IShift.interface';
import ShiftsList from '../../pages/Clubs/components/ShiftsList';

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
      <CardFooter linkRight='/clubs/shift-form' linkRightText='Add Shift' />
    </Card>
  );
};

export default UpcomingShiftsWidget;
