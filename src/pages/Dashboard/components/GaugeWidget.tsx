import { FC } from 'react';
import Card from '../../../components/ui/Card/Card';
import CardHeader from '../../../components/ui/Card/CardHeader';
import CardContent from '../../../components/ui/Card/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import styles from './Widget.module.css';
import CardFooter from '../../../components/ui/Card/CardFooter';
import CardContentVacant from '../../../components/ui/Card/CardContentVacant';
import Gauges from '../../../components/charts/Gauge/Gauge';

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
        <FontAwesomeIcon className={styles.faIcon} icon={faGripVertical} />
      </CardHeader>
      <CardContent>
        {ytdIncome || ytdExpenses ? (
          <div className={styles.gaugeContainer}>
            <Gauges title='Income' ytdValue={ytdIncome} max={60000} />
            <Gauges
              title='Expenses'
              ytdValue={ytdExpenses}
              max={35000}
              reverse={true}
            />
          </div>
        ) : (
          <CardContentVacant title='No Fianance Data Available' />
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
