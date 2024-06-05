import { FC } from 'react';
import Card from '../../../components/ui/Card/Card';
import CardHeader from '../../../components/ui/Card/CardHeader';
import CardContentVacant from '../../../components/ui/Card/CardContentVacant';
import CardContent from '../../../components/ui/Card/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import styles from './MonthlyBudgetWidget.module.css';
import CardFooter from '../../../components/ui/Card/CardFooter';

const MonthlyBudgetWidget: FC = (): JSX.Element => {
  return (
    <Card
      addedStyles={{
        maxWidth: '607.5px',
      }}
    >
      <CardHeader text={'Monthly Budget'}>
        <FontAwesomeIcon className={styles.faIcon} icon={faGripVertical} />
      </CardHeader>
      <CardContent>
        <CardContentVacant title='No Budget Information Available' />
      </CardContent>
      <CardFooter linkRight='' linkRightText='Create Budget' />
    </Card>
  );
};

export default MonthlyBudgetWidget;
