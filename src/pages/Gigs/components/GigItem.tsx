import { FC } from 'react';
import { Gig } from '../../../types/Gig';
import styles from './GigItem.module.css';
import {
  faClock,
  faLocationDot,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CardContentItem from '../../../components/ui/Card/CardContentItem';
import CardContentAccordian from '../../../components/ui/Card/CardContentAccordian';
import ShiftsList from './ShiftsList';
import CardHeader from '../../../components/ui/Card/CardHeader';
import Card from '../../../components/ui/Card/Card';
import CardContent from '../../../components/ui/Card/CardContent';

const GigItem: FC<{ gig: Gig }> = ({ gig }): JSX.Element => {
  const { address, contact, name, shifts } = gig;

  return (
    <Card>
      <CardHeader text={name} />
      <CardContent>
        <CardContentItem text={contact.name} icon={faUser} />
        <CardContentItem text={contact.phone} icon={faPhone} />
        <CardContentItem
          text={`${address.street} ${address.city}, ${address.state} ${address.zip}`}
          icon={faLocationDot}
        />
        <CardContentAccordian
          text='Scheduled Shifts'
          icon={faClock}
          enabled={shifts.length > 0}
        >
          {shifts.length > 0 ? <ShiftsList shifts={shifts} /> : ''}
        </CardContentAccordian>
      </CardContent>
      <div className={styles.addGig}>
        <Link className={styles.shiftLink} to='shift-form'>
          Add Shift
        </Link>
      </div>
    </Card>
  );
};

export default GigItem;
