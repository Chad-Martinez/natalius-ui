import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import widgetStyles from './Widget.module.css';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardContent from '../ui/Card/CardContent';
import Gauges from '../charts/Gauge/Gauge';
import CardContentVacant from '../ui/Card/CardContentVacant';
import CardFooter from '../ui/Card/CardFooter';

type GaugeWidgetProps = {
  ytdIncome: number;
  ytdExpenses: number;
};

const GaugeWidget: FC<GaugeWidgetProps> = ({
  ytdIncome,
  ytdExpenses,
}): JSX.Element => {
  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text='Year to Date'>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        {ytdIncome || ytdExpenses ? (
          <div className={widgetStyles.gaugeContainer}>
            <Gauges title='Income' ytdValue={ytdIncome} max={60000} />
            <Gauges
              title='Expenses'
              ytdValue={ytdExpenses}
              max={35000}
              reverse={true}
            />
          </div>
        ) : (
          <CardContentVacant title='No Finance Data Available' />
        )}
      </CardContent>
      <CardFooter
        linkLeft='/income'
        linkLeftText='Income Dashboard'
        linkRight='/expenses'
        linkRightText='Expenses Dashboard'
      />
    </Card>
  );
};

export default GaugeWidget;
