import { FC } from 'react';
import { getGigs } from '../../services/gigsServices';
import GigsList from '../../components/gig/GigsList';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import styles from '../PageWrapper.module.css';

const Gigs: FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <GigsList />
      </div>
      <BottomNav>
        <Button text='Add Gig' />
      </BottomNav>
    </div>
  );
};

export default Gigs;

export const loader = async () => {
  try {
    const { data } = await getGigs();
    console.log('data ', data);
    return data;
  } catch (error) {
    console.error('Loader Error: GetGigs ', error);
    return error;
  }
};
