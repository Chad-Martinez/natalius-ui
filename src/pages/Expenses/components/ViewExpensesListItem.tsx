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
import styles from '../ViewExpenses.module.css';
import { IShift } from '../../../interfaces/IShift.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IExpense } from '../../../interfaces/IExpense.interface';
import PopupMenu from '../../../components/ui/PopupMenu/PopupMenu';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

type ViewExpensesListItemProps = {
  expense: IExpense | IShift;
  setExpense: Dispatch<SetStateAction<IExpense | IShift | null>>;
  menuItems: JSX.Element;
};

const ViewExpensesListItem = memo(
  forwardRef(
    (
      { expense, menuItems, setExpense }: ViewExpensesListItemProps,
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
        setExpense(expense);
      };

      const generateListItem = (): JSX.Element => {
        if ('vendor' in expense) {
          expense as IExpense;
          return (
            <div className={styles.listItem}>
              <div className={styles.date}>
                {dayjs.utc(expense.date).local().format('MM/DD/YY')}
              </div>
              <div className={styles.vendor}>
                <span>{expense.vendor}</span>
              </div>
              <div className={styles.amount}>${expense.amount.toFixed(2)}</div>
              <div className={styles.type}>{expense.type[0]}</div>
              <div className={styles.actionsContainer}>
                <div className={styles.actions} onClick={handleMenu}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
            </div>
          );
        } else if ('club' in expense) {
          const shift = { ...expense } as IShift;
          return (
            <div className={styles.listItem}>
              <div className={styles.date}>
                {dayjs.utc(shift.start).tz(shift.timezone).format('MM/DD/YY')}
              </div>
              <div className={styles.vendor}>
                <span>{shift.club}</span>
              </div>
              <div className={styles.amount}>
                ${shift.expenses?.totalShiftExpenses}
              </div>
              <div className={styles.type}>
                {shift.expenses?.type.slice(0, 2)}
              </div>
              <div className={styles.actionsContainer}>
                <div className={styles.actions} onClick={handleMenu}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      };

      return (
        <>
          {generateListItem()}
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

export default ViewExpensesListItem;
