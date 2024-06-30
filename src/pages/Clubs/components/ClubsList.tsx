import { FC } from 'react';
import ClubItem from './ClubItem';
import styles from './ClubsList.module.css';
import { IClub } from '../../../interfaces/IClub.interface';

const ClubsList: FC<{
  clubs: IClub[];
  archiveClub: (payload: IClub) => void;
}> = ({ clubs, archiveClub }): JSX.Element => {
  return (
    <div className={styles.container}>
      {clubs && clubs.length > 0
        ? clubs.map((club) => (
            <ClubItem key={club._id} club={club} archiveClub={archiveClub} />
          ))
        : ''}
    </div>
  );
};

export default ClubsList;
