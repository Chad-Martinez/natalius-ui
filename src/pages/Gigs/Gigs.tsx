import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import GigsList from './components/GigsList';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import styles from '../PageWrapper.module.css';

const Gigs: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('form');
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <GigsList />
      </div>
      <BottomNav>
        <Button text='Add Gig' onClick={handleNavigate} />
      </BottomNav>
    </div>
  );
};

export default Gigs;
