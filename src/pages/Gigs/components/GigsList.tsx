import { FC } from 'react';
import GigItem from './GigItem';
import styles from './GigsList.module.css';
import { IGig } from '../../../interfaces/IGig.interface';

const GigsList: FC<{ gigs: IGig[]; archiveGig: (payload: IGig) => void }> = ({
  gigs,
  archiveGig,
}): JSX.Element => {
  return (
    <div className={styles.container}>
      {gigs && gigs.length > 0
        ? gigs.map((gig) => (
            <GigItem key={gig._id} gig={gig} archiveGig={archiveGig} />
          ))
        : ''}
    </div>
  );
};

export default GigsList;
