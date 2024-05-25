import { FC } from 'react';
import styles from './PageWrapper.module.css';
import BottomNav from '../components/dashboard/BottomNav';
import Button from '../components/ui/Button';

const Dashboard: FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}></div>
      <BottomNav>
        <Button text='Add Income' />
        <Button text='Add Expense' />
      </BottomNav>
    </div>
  );
};

export default Dashboard;
