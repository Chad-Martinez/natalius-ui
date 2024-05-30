import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import GigItem from './GigItem';
import styles from './GigsList.module.css';
import { Gig } from '../../../types/Gig';

const GigsList: FC = (): JSX.Element => {
  const gigs: Gig[] = useLoaderData() as Gig[];
  return (
    <div className={styles.container}>
      {gigs && gigs.length > 0
        ? gigs.map((gig) => <GigItem key={gig._id} gig={gig} />)
        : ''}
    </div>
  );
};

export default GigsList;
