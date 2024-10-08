import { FC, useRef, useState } from 'react';
import styles from './ClubItem.module.css';
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
import ShiftsList from '../../../components/shift/ShiftsList';
import CardHeader from '../../../components/ui/Card/CardHeader';
import Card from '../../../components/ui/Card/Card';
import CardContent from '../../../components/ui/Card/CardContent';
import Modal from '../../../components/ui/Modal/Modal';
import { IClub } from '../../../interfaces/IClub.interface';
import { IHTMLDialogElement } from '../../../interfaces/IHTMLDialog.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardFooter from '../../../components/ui/Card/CardFooter';
import { IShift } from '../../../interfaces/IShift.interface';

const ClubItem: FC<{ club: IClub; archiveClub: (payload: IClub) => void }> = ({
  club,
  archiveClub,
}): JSX.Element => {
  const { fullAddress, contact, name, shifts } = club;
  const [filteredShifts, setFilteredShifts] = useState<IShift[]>(
    shifts && shifts.length > 0
      ? shifts.filter((shift: IShift) => shift.shiftComplete === false)
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
    const payload: IClub = {
      _id: club._id,
      isArchived: !club.isArchived,
      name: club.name,
    };
    archiveClub(payload);
    dialogRef.current?.closeModal();
  };

  const handleEdit = () => {
    navigate('club-form', { state: { club } });
  };

  const handleShowShifts = (): void => {
    if (shifts) {
      if (showCompletedShifts) {
        setFilteredShifts(
          shifts.filter((shift: IShift) => shift.shiftComplete === false)
        );
        setShowCompletedShifts(false);
      } else {
        setFilteredShifts(
          shifts.filter((shift: IShift) => shift.shiftComplete === true)
        );
        setShowCompletedShifts(true);
      }
    }
  };

  return (
    <>
      <Modal
        ref={dialogRef}
        title={club.isArchived ? 'Activate Club?' : 'Archive Club?'}
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
            icon={club.isArchived ? faInbox : faBoxArchive}
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
        {!club.isArchived ? (
          <CardFooter
            linkLeftText={
              !showCompletedShifts
                ? 'Show Finished Shifts'
                : 'Show Active Shifts'
            }
            linkLeftHandleClick={handleShowShifts}
            linkRight={`shift-form/${club._id}`}
            linkRightText='Add Shift'
          />
        ) : (
          ''
        )}
      </Card>
    </>
  );
};

export default ClubItem;
