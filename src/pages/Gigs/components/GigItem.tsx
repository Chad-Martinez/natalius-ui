import { FC, useRef } from 'react';
import styles from './GigItem.module.css';
import {
  faBoxArchive,
  faClock,
  faInbox,
  faLocationDot,
  faPencil,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CardContentItem from '../../../components/ui/Card/CardContentItem';
import CardContentAccordian from '../../../components/ui/Card/CardContentAccordian';
import ShiftsList from './ShiftsList';
import CardHeader from '../../../components/ui/Card/CardHeader';
import Card from '../../../components/ui/Card/Card';
import CardContent from '../../../components/ui/Card/CardContent';

import Modal from '../../../components/ui/Modal/Modal';
import { IGig } from '../../../interfaces/IGig.interface';
import { IHTMLDialogElement } from '../../../interfaces/IHTMLDialog.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardFooter from '../../../components/ui/Card/CardFooter';

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
      isArchived: !gig.isArchived,
      name: gig.name,
    };
    archiveGig(payload);
    dialogRef.current?.closeModal();
  };

  const handleEdit = () => {
    navigate('gig-form', { state: { gig } });
  };

  return (
    <>
      <Modal
        ref={dialogRef}
        title={gig.isArchived ? 'Activate Gig?' : 'Archive Gig?'}
        onConfirm={handleArchive}
      />
      <Card addedStyles={{ maxWidth: '607.5px' }}>
        <CardHeader text={name}>
          <FontAwesomeIcon
            className={styles.faIcon}
            icon={faPencil}
            onClick={handleEdit}
          />
          <FontAwesomeIcon
            className={styles.faIcon}
            icon={gig.isArchived ? faInbox : faBoxArchive}
            onClick={openModal}
          />
        </CardHeader>
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
        {!gig.isArchived ? (
          <CardFooter
            linkRight={`shift-form/${gig._id}`}
            linkRightText='Add Shift'
          />
        ) : (
          ''
        )}
      </Card>
    </>
  );
};

export default GigItem;
