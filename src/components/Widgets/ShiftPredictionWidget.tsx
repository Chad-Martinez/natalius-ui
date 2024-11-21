import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from './Widget.module.css';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import CardContentVacant from '../ui/Card/CardContentVacant';
import CardFooter from '../ui/Card/CardFooter';
import dayjs from 'dayjs';

const ShiftPredictionWidget: FC<{
  shiftPrediction: {
    prediction: number;
    nextShift: { start: Date; timezone: string };
  } | null;
}> = ({ shiftPrediction }): JSX.Element => {
  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text='Shift Prediction'>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        {shiftPrediction ? (
          <span>
            {`${dayjs
              .utc(shiftPrediction.nextShift.start)
              .tz(shiftPrediction.nextShift.timezone)
              .format('dddd MMM Do')}: `}
            <span
              className={widgetStyles.highlight}
            >{`$${shiftPrediction.prediction}`}</span>
          </span>
        ) : (
          <CardContentVacant title='No Scheduled Shift to Perdict' />
        )}
      </CardContent>
      {!shiftPrediction && (
        <CardFooter linkRight='/shifts/shift-form' linkRightText='Add Shift' />
      )}
    </Card>
  );
};

export default ShiftPredictionWidget;
