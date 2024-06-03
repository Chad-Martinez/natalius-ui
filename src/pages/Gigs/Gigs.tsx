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
  const [gigs, setGigs] = useState<IGig[]>([]);
  const [archivedGigs, setArchivedGigs] = useState<IGig[]>([]);
  const [viewArchive, setViewArchive] = useState<boolean>(false);
  const navigate = useNavigate();
  const gigData: IGig[] = useLoaderData() as IGig[];

  useEffect(() => {
    if (gigData) {
      setGigs(gigData.filter((gig: IGig) => gig.isArchived === false));
      setArchivedGigs(gigData.filter((gig: IGig) => gig.isArchived === true));
    }
  }, [gigData]);

  const handleAddGig = () => {
    navigate('gig-form');
  };

  const archiveGig = async (payload: IGig): Promise<void> => {
    try {
      await updateGig(payload);
      if (payload.isArchived) {
        const gig = gigs?.find((gig) => gig._id === payload._id);
        if (gig) setArchivedGigs([...archivedGigs, gig]);
        setGigs(gigs.filter((gig: IGig) => gig._id !== payload._id));
      } else {
        const archivedGig = archivedGigs.find(
          (aGig: IGig) => aGig._id === payload._id
        );
        if (archivedGig) setGigs([...gigs, archivedGig]);
        setArchivedGigs(
          archivedGigs.filter((gig: IGig) => gig._id !== payload._id)
        );
      }
      notify(
        payload.isArchived ? 'Gig has been archived' : 'Gig has been activated',
        'success',
        'archive-gig-success'
      );
    } catch (error) {
      console.error('HandleArchive Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'archive-gig-error');
    }
  };

  const handleViewArchive = () => setViewArchive(!viewArchive);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h2 className={styles.title}>{!viewArchive ? 'Active' : 'Archived'}</h2>
        <div className={styles.links}>
          <div className={styles.link} onClick={handleViewArchive}>
            {!viewArchive ? 'Archived Gigs' : 'Active Gigs'}
          </div>
        </div>
        {gigs && !viewArchive ? (
          <GigsList gigs={gigs} archiveGig={archiveGig} />
        ) : archivedGigs && viewArchive ? (
          <GigsList gigs={archivedGigs} archiveGig={archiveGig} />
        ) : (
          ''
        )}
      </div>
      <BottomNav>
        <Button text='Add Gig' onClick={handleAddGig} />
      </BottomNav>
    </div>
  );
};

export default Gigs;
