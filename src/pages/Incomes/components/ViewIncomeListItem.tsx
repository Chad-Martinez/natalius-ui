import {
  Dispatch,
  forwardRef,
  memo,
  PointerEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import styles from '../ViewIncome.module.css';
import { IShift } from '../../../interfaces/IShift.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopupMenu from '../../../components/ui/PopupMenu/PopupMenu';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { moneyFormatter } from '../../../helpers/format-helpers';

type ViewIncomeListItemProps = {
  shift: IShift;
  setShift: Dispatch<SetStateAction<IShift | null>>;
  menuItems: JSX.Element;
};

const ViewIncomeListItem = memo(
  forwardRef(
    (
      { shift, menuItems, setShift }: ViewIncomeListItemProps,
      ref
    ): JSX.Element => {
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
        } as PointerEvent;
        setTop(e.clientY);
        setLeft(e.clientX - 52);
        setShowPopup((prev) => !prev);
        setShift(shift);
      };

      return (
        <>
          <div className={styles.listItem}>
            <div className={styles.date}>
              {dayjs.utc(shift.start).tz(shift.timezone).format('MM/DD/YY')}
            </div>
            <div className={styles.club}>
              <span>{shift?.club}</span>
            </div>
            <div className={styles.amount}>
              {`$${moneyFormatter(shift.income?.amount)}`}
            </div>
            <div className={styles.actionsContainer}>
              <div className={styles.actions} onClick={handleMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
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

export default ViewIncomeListItem;
