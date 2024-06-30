import { FC, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ClubsList from './components/ClubsList';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import styles from '../PageWrapper.module.css';
import { IClub } from '../../interfaces/IClub.interface';
import { AxiosError } from 'axios';
import { updateClub } from '../../services/clubsServices';
import { notify } from '../../utils/toastify';
import PageHeader from '../../components/ui/PageHeader/PageHeader';

const Clubs: FC = (): JSX.Element => {
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [archivedClubs, setArchivedClubs] = useState<IClub[]>([]);
  const [viewArchive, setViewArchive] = useState<boolean>(false);
  const navigate = useNavigate();
  const clubData: IClub[] = useLoaderData() as IClub[];

  useEffect(() => {
    if (clubData) {
      setClubs(clubData.filter((club: IClub) => club.isArchived === false));
      setArchivedClubs(
        clubData.filter((club: IClub) => club.isArchived === true)
      );
    }
  }, [clubData]);

  const handleAddClub = () => {
    navigate('club-form');
  };

  const archiveClub = async (payload: IClub): Promise<void> => {
    try {
      await updateClub(payload);
      if (payload.isArchived) {
        const club = clubs?.find((club) => club._id === payload._id);
        if (club) setArchivedClubs([...archivedClubs, club]);
        setClubs(clubs.filter((club: IClub) => club._id !== payload._id));
      } else {
        const archivedClub = archivedClubs.find(
          (aClub: IClub) => aClub._id === payload._id
        );
        if (archivedClub) setClubs([...clubs, archivedClub]);
        setArchivedClubs(
          archivedClubs.filter((club: IClub) => club._id !== payload._id)
        );
      }
      notify(
        payload.isArchived
          ? 'Club has been archived'
          : 'Club has been activated',
        'success',
        'archive-club-success'
      );
    } catch (error) {
      console.error('HandleArchive Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'archive-club-error');
    }
  };

  const handleViewArchive = () => setViewArchive(!viewArchive);

  return (
    <>
      <div className={styles.mainContent}>
        <h2 className={styles.title}>{!viewArchive ? 'Active' : 'Archived'}</h2>
        <PageHeader
          linkRight=''
          linkRightText={!viewArchive ? 'Archived Clubs' : 'Active Clubs'}
          linkRightHandleClick={handleViewArchive}
        />
        {clubs && !viewArchive ? (
          <ClubsList clubs={clubs} archiveClub={archiveClub} />
        ) : archivedClubs && viewArchive ? (
          <ClubsList clubs={archivedClubs} archiveClub={archiveClub} />
        ) : (
          ''
        )}
      </div>
      <BottomNav>
        <Button text='Add Club' onClick={handleAddClub} />
      </BottomNav>
    </>
  );
};

export default Clubs;
