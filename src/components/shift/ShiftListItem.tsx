import {
  Dispatch,
  forwardRef,
  memo,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import styles from './ShiftListItem.module.css';
import { IShift } from '../../interfaces/IShift.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import PopupMenu from '../ui/PopupMenu/PopupMenu';

type ShiftListItemProps = {
  shift: IShift;
  setShift: Dispatch<SetStateAction<IShift | null>>;
  menuItems: JSX.Element;
};

const ShiftListItem = memo(
  forwardRef(
    ({ shift, setShift, menuItems }: ShiftListItemProps, ref): JSX.Element => {
      const menuRef = useRef<HTMLUListElement>(null);
      const [showPopup, setShowPopup] = useState<boolean>(false);
      const [top, setTop] = useState<number>(0);
      const [left, setLeft] = useState<number>(0);

      useImperativeHandle(ref, () => ({
        closeMenu: () => setShowPopup(false),
      }));

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
          ) {
            setShowPopup(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const handleMenu = (event: SyntheticEvent): void => {
        event.stopPropagation();
        const e = {
          ...event,
        } as unknown as PointerEvent;
        setTop(e.clientY);
        setLeft(e.clientX - 52);
        setShowPopup((prev) => !prev);
        setShift(shift);
      };

      return (
        <>
          <div className={styles.shiftListItem}>
            <div>
              {dayjs.utc(shift.start).tz(shift.timezone).format('ddd: MMM Do')}{' '}
              @ {dayjs.utc(shift.start).tz(shift.timezone).format('h:mma')} -{' '}
              {dayjs.utc(shift.end).tz(shift.timezone).format('h:mma')}
            </div>
            <div className={styles.actions} onClick={handleMenu}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>
          {showPopup && (
            <PopupMenu
              top={top}
              left={left}
              menuRef={menuRef}
              children={menuItems}
            />
          )}
        </>
      );
    }
  )
);

export default ShiftListItem;
