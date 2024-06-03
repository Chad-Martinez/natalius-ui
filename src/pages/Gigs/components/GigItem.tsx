import { FC, useRef } from 'react';
import styles from './GigItem.module.css';
import {
  faClock,
  faLocationDot,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import CardContentItem from '../../../components/ui/Card/CardContentItem';
import CardContentAccordian from '../../../components/ui/Card/CardContentAccordian';
import ShiftsList from './ShiftsList';
import CardHeader from '../../../components/ui/Card/CardHeader';
import Card from '../../../components/ui/Card/Card';
import CardContent from '../../../components/ui/Card/CardContent';

import Modal from '../../../components/ui/Modal/Modal';
import { IGig } from '../../../interfaces/IGig.interface';
import { IHTMLDialogElement } from '../../../interfaces/IHTMLDialog.interface';

const GigItem: FC<{ gig: IGig; archiveGig: (payload: IGig) => void }> = ({
  gig,
  archiveGig,
}): JSX.Element => {
  const { fullAddress, contact, name, shifts } = gig;
  const navigate = useNavigate();
  const dialogRef = useRef<IHTMLDialogElement | null>(null);

  const openModal = (): void => {
    dialogRef.current?.openModal();
  };

  const handleArchive = (): void => {
    const payload: IGig = {
      _id: gig._id,
      isArchived: true,
      name: gig.name,
    };
    archiveGig(payload);
  };

  const handleEdit = () => {
    navigate('gig-form', { state: { gig } });
  };

  return (
    <>
      <Modal ref={dialogRef} title='Archive Gig?' onConfirm={handleArchive} />
      <Card addedStyles={{ maxWidth: '607.5px' }}>
        <CardHeader text={name} onEdit={handleEdit} onDelete={openModal} />
        <CardContent>
          {contact?.name && (
            <CardContentItem text={contact.name} icon={faUser} />
          )}
          {contact?.phone && (
            <CardContentItem text={contact.phone} icon={faPhone} />
          )}
          {fullAddress && (
            <CardContentItem text={fullAddress} icon={faLocationDot} />
          )}
          {shifts && shifts.length > 0 && (
            <CardContentAccordian
              text='Scheduled Shifts'
              icon={faClock}
              enabled={shifts.length > 0}
            >
              {shifts.length > 0 ? <ShiftsList shiftData={shifts} /> : ''}
            </CardContentAccordian>
          )}
        </CardContent>
        <div className={styles.addGig}>
          <Link className={styles.shiftLink} to={`shift-form/${gig._id}`}>
            Add Shift
          </Link>
        </div>
      </Card>
    </>
  );
};

export default GigItem;
