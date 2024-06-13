import { FC } from 'react';
import styles from './AveragesWidget.module.css';
import widgetStyles from '../../../styles/Widget.module.css';
import Card from '../../../components/ui/Card/Card';
import CardHeader from '../../../components/ui/Card/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import CardContent from '../../../components/ui/Card/CardContent';
import Counter from '../../../components/ui/Counter/Counter';
import { useLoaderData } from 'react-router-dom';

const AveragesWidget: FC = (): JSX.Element => {
  const avgsLoaderData = useLoaderData() as {
    daily: number;
    weekly: number;
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text='Averages'>
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
              amount={avgsLoaderData.daily}
              interval={10}
              skip={2}
            />
          </div>
          <div className={styles.avgItem}>
            <Counter
              period='Weekly'
              amount={avgsLoaderData.weekly}
              interval={2}
              skip={3}
            />
          </div>
          <div className={styles.avgItem}>
            <Counter
              period='Monthly'
              amount={avgsLoaderData.monthly}
              interval={1}
              skip={5}
            />
          </div>
          <div className={styles.avgItem}>
            {avgsLoaderData.yearly ? (
              <Counter
                period='Yearly'
                amount={avgsLoaderData.yearly}
                interval={1}
                skip={25}
              />
            ) : (
              <Counter
                period='Quarterly'
                amount={avgsLoaderData.quarterly}
                interval={1}
                skip={13}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AveragesWidget;
