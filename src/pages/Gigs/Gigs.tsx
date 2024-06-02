import { FC, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import GigsList from './components/GigsList';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import styles from '../PageWrapper.module.css';
import { IGig } from '../../interfaces/IGig.interface';
import { AxiosError } from 'axios';
import { updateGig } from '../../services/gigsServices';
import { notify } from '../../utils/toastify';

const Gigs: FC = (): JSX.Element => {
  const [gigs, setGigs] = useState<IGig[]>();
  const navigate = useNavigate();
  const gigData: IGig[] = useLoaderData() as IGig[];

  useEffect(() => {
    if (gigData) setGigs(gigData);
  }, [gigData]);

  const handleAddGig = () => {
    navigate('gig-form');
  };

  const archiveGig = async (payload: IGig): Promise<void> => {
    try {
      await updateGig(payload);
      const filteredGigs = gigs?.filter((gig: IGig) => gig._id !== payload._id);
      setGigs(filteredGigs);
      notify('Gig has been archived', 'success', 'archive-gig-success');
    } catch (error) {
      console.error('HandleArchive Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'archive-gig-error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {gigs && <GigsList gigs={gigs} archiveGig={archiveGig} />}
      </div>
      <BottomNav>
        <Button text='Add Gig' onClick={handleAddGig} />
      </BottomNav>
    </div>
  );
};

export default Gigs;
