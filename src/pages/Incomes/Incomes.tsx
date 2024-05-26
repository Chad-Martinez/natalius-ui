import { FC } from 'react';
import styles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';

const Incomes: FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>Income</div>
      <BottomNav>
        <Button text='Add Income' />
      </BottomNav>
    </div>
  );
};

export default Incomes;
