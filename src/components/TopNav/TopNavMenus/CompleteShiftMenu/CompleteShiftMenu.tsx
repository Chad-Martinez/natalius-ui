import { useNavigate } from 'react-router-dom';
import { DropdownProps } from '../TopNavMenus';
import styles from './CompleteShiftMenu.module.css';
import useDropdown from '../../../../hooks/useDropdown';
import Dropdown from '../../../ui/Dropdown/Dropdown';
import NotificationListItem from './CompleteShiftMenuItem';
import { FC, useState, useEffect, useCallback } from 'react';
import { IShift } from '../../../../interfaces/IShift.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { getShiftsToComplete } from '../../../../services/shiftServices';

const CompleteShiftMenu: FC<DropdownProps> = ({
  openDropdowns,
  setOpenDropdowns,
}): JSX.Element => {
  const { isOpen, dropdownRef, buttonRef, toggleDropdown } = useDropdown();
  const [shifts, setShifts] = useState<IShift[] | []>([]);

  const navigate = useNavigate();

  const getShifts = useCallback(async () => {
    const { data } = await getShiftsToComplete();
    setShifts(data);
    return data;
  }, []);

  useEffect(() => {
    getShifts();
  }, [getShifts]);

  const handleDropdown = (): void => {
    setOpenDropdowns('notify');
    toggleDropdown();
  };

  const mappedShifts = shifts?.map((shift: IShift) => (
    <NotificationListItem key={shift._id} shift={shift} />
  ));

  const completeShift = (shiftIndex: number) => {
    handleDropdown();
    navigate(`/shifts/complete-shift/${shifts[shiftIndex]?._id}`);
  };

  return (
    <>
      <div
        ref={buttonRef}
        className={styles.completeShiftMenuWrapper}
        style={{ textAlign: 'left' }}
      >
        <div
          className={styles.completeShiftMenuContainer}
          onClick={handleDropdown}
        >
          <FontAwesomeIcon
            icon={faMoneyBill1}
            className={styles.completeShiftMenuIcon}
          />
          {shifts?.length > 0 ? (
            <div className={styles.completeShiftMenuBadge}></div>
          ) : (
            ''
          )}
        </div>
        {openDropdowns === 'notify' && (
          <Dropdown
            children={shifts?.length ? mappedShifts : []}
            visible={isOpen}
            dropdownRef={dropdownRef}
            headerText='Shifts to Complete'
            cbIndex={completeShift}
            noItemText='All shifts complete'
          />
        )}
      </div>
    </>
  );
};

export default CompleteShiftMenu;
