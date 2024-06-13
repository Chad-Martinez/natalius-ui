import { FC, useRef, useState } from 'react';
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
import { IShift } from '../../../interfaces/IShift.interface';

const GigItem: FC<{ gig: IGig; archiveGig: (payload: IGig) => void }> = ({
  gig,
  archiveGig,
}): JSX.Element => {
  const { fullAddress, contact, name, shifts } = gig;
  const [filteredShifts, setFilteredShifts] = useState<IShift[]>(
    shifts && shifts.length > 0
      ? shifts.filter((shift: IShift) => shift.incomeReported === false)
      : []
  );
  const [showCompletedShifts, setShowCompletedShifts] =
    useState<boolean>(false);
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

  const handleShowShifts = (): void => {
    if (shifts) {
      if (showCompletedShifts) {
        setFilteredShifts(
          shifts.filter((shift: IShift) => shift.incomeReported === false)
        );
        setShowCompletedShifts(false);
      } else {
        setFilteredShifts(
          shifts.filter((shift: IShift) => shift.incomeReported === true)
        );
        setShowCompletedShifts(true);
      }
    }
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
          {filteredShifts && filteredShifts.length > 0 && (
            <CardContentAccordian
              text='Scheduled Shifts'
              icon={faClock}
              enabled={filteredShifts.length > 0}
            >
              {filteredShifts.length > 0 ? (
                <ShiftsList shiftData={filteredShifts} />
              ) : (
                ''
              )}
            </CardContentAccordian>
          )}
        </CardContent>
        {!gig.isArchived ? (
          <CardFooter
            linkLeftText={
              !showCompletedShifts
                ? 'Show Finished Shifts'
                : 'Show Active Shifts'
            }
            linkLeftHandleClick={handleShowShifts}
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
