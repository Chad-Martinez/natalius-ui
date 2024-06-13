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

const AveragesWidget: FC<{ averages: IncomeAverages }> = ({
  averages,
}): JSX.Element => {
  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text='Average Earnings'>
        <FontAwesomeIcon
          className={widgetStyles.faIcon}
          icon={faGripVertical}
        />
      </CardHeader>
      <CardContent>
        <div className={styles.avgsContainer}>
          <div className={styles.avgItem}>
            <Counter
              period='Daily'
              amount={averages?.daily}
              interval={5}
              skip={2}
            />
          </div>
          <div className={styles.avgItem}>
            <Counter
              period='Weekly'
              amount={averages?.weekly}
              interval={2}
              skip={5}
            />
          </div>
          <div className={styles.avgItem}>
            <Counter
              period='Monthly'
              amount={averages?.monthly}
              interval={1}
              skip={10}
            />
          </div>
          <div className={styles.avgItem}>
            {averages?.yearly ? (
              <Counter
                period='Yearly'
                amount={averages?.yearly}
                interval={1}
                skip={25}
              />
            ) : (
              <Counter
                period='Quarterly'
                amount={averages?.quarterly}
                interval={1}
                skip={19}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AveragesWidget;
