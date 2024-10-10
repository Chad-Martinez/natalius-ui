import { FC } from 'react';
import styles from './AveragesWidget.module.css';
import widgetStyles from '../Widget.module.css';
import Card from '../../ui/Card/Card';
import CardHeader from '../../ui/Card/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import CardContent from '../../ui/Card/CardContent';
import Counter from '../../ui/Counter/Counter';
import { IncomeAverages } from '../../../types/IncomeAverages';
import dayjs from 'dayjs';

const AveragesWidget: FC<{ averages: IncomeAverages }> = ({
  averages,
}): JSX.Element => {
  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text={`${dayjs().year()} Average Income`}>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        <div className={styles.avgsContainer}>
          <div className={styles.avgItem}>
            <Counter
              period='Shift'
              amount={averages?.perShift}
              interval={2}
              skip={5}
            />
          </div>
          <div className={styles.avgItem}>
            <Counter
              period='Weekly'
              amount={averages?.perWeek}
              interval={2}
              skip={5}
            />
          </div>
          <div className={styles.avgItem}>
            <Counter
              period='Monthly'
              amount={averages?.perMonth}
              interval={1}
              skip={10}
            />
          </div>
          <div className={styles.avgItem}>
            <Counter
              period='Yearly'
              amount={averages?.perYear}
              interval={1}
              skip={25}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AveragesWidget;
