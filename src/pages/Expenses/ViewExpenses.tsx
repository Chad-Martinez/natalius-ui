import {
  FC,
  useRef,
  useState,
  useEffect,
  ReactElement,
  SyntheticEvent,
} from 'react';
import { AxiosError } from 'axios';
import {
  deleteExpense,
  paginatedExpenses,
} from '../../services/expensesService';
import styles from './ViewExpenses.module.css';
import pageStyles from '../PageWrapper.module.css';
import Modal from '../../components/ui/Modal/Modal';
import { notify } from '../../helpers/toast-helpers';
import Button from '../../components/ui/Button/Button';
import { IShift } from '../../interfaces/IShift.interface';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IExpense } from '../../interfaces/IExpense.interface';
import Paginator from '../../components/ui/Paginator/Paginator';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import ViewExpensesListItem from './components/ViewExpensesListItem';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';

type PaginatedExpenses = {
  expenses: Array<IExpense | IShift>;
  count: number;
  pages: number;
};

type MenuRefs = {
  [key: string]: { closeMenu?: () => void } | null;
};

const ViewExpenses: FC = (): JSX.Element => {
  const [expenses, setExpenses] = useState<Array<IExpense | IShift>>([]);
  const [expense, setExpense] = useState<IExpense | IShift | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [count, setCount] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  const navigate = useNavigate();

  const menuRefs = useRef<MenuRefs>({});
  const dialogRef = useRef<IHTMLDialogElement | null>(null);

  const closeAllMenus = (): void => {
    Object.values(menuRefs.current).forEach(
      (ref) => ref?.closeMenu && ref?.closeMenu()
    );
  };

  const expenseLoaderData = useLoaderData() as PaginatedExpenses;

  useEffect(() => {
    if (expenseLoaderData) {
      setExpenses(expenseLoaderData.expenses);
      setTotalPages(expenseLoaderData.pages);
      setCount(expenseLoaderData.count);
      setCurrPage(1);
    }
  }, [expenseLoaderData]);

  const handleAddExpense = (): void => navigate('/expenses/expense-form');

  const handlePrev = async (): Promise<void> => {
    try {
      const { data } = await paginatedExpenses(currPage - 1, 10);
      setExpenses(data.expenses);
      setCurrPage((prevPage) => prevPage - 1);
      if (+data.count !== count) setCount(+data.count);
      if (+data.pages !== totalPages) setTotalPages(+data.pages);
    } catch (error) {
      console.error('Paginated Expense Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'paginate-expense-error');
    }
  };

  const handleNext = async (): Promise<void> => {
    try {
      const { data } = await paginatedExpenses(currPage + 1, 10);
      setExpenses(data.expenses);
      setCurrPage((prevPage) => prevPage + 1);
      if (+data.count !== count) setCount(+data.count);
      if (+data.pages !== totalPages) setTotalPages(+data.pages);
    } catch (error) {
      console.error('Paginated Expense Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'paginate-expense-error');
    }
  };

  const openModal = (event: SyntheticEvent): void => {
    event.stopPropagation();
    dialogRef.current?.openModal();
    closeAllMenus();
  };

  const handleEdit = (): void => {
    if (expense && 'vendor' in expense)
      navigate('/expenses/expense-form', { state: { expense } });
    else if (expense && 'club' in expense)
      navigate(`/shift/complete-shift/${expense?._id}`, {
        state: { goToPage: 2 },
      });
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (expense?._id) {
        const { data } = await deleteExpense(expense._id);
        const response = await paginatedExpenses(currPage, 10);
        setExpenses(response.data.expenses);
        notify(data.message, 'success', 'delete-expense-success');
      }
    } catch (error) {
      console.error('Delete Expense Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'delete-expense-error');
    } finally {
      dialogRef.current?.closeModal();
    }
  };

  const PopupMenuItems: ReactElement = (
    <>
      <li onClick={handleEdit}>
        <FontAwesomeIcon icon={faPencil} />
      </li>
      <li onClick={openModal}>
        <FontAwesomeIcon icon={faTrash} />
      </li>
    </>
  );

  const mappedExpenses: JSX.Element[] = expenses.map(
    (expense: IExpense | IShift) => (
      <ViewExpensesListItem
        key={expense._id}
        expense={expense}
        menuItems={PopupMenuItems}
        setExpense={setExpense}
        ref={(el) => {
          if (el) {
            menuRefs.current[expense._id] = el;
          } else {
            delete menuRefs.current[expense._id];
          }
        }}
      />
    )
  );

  return (
    <>
      <Modal
        ref={dialogRef}
        title='Delete Expense?'
        subtitle='This action cannot be undone'
        onConfirm={handleDelete}
      />
      <div className={pageStyles.mainContent}>
        <PageHeader
          linkLeftText='Go back'
          linkLeftHandleClick={() => navigate(-1)}
        />
        <div className={styles.legend}>
          M: Misc | S: Service | E: Equipment | SH: Shift
        </div>
        {expenses ? (
          <div className={styles.listContainer}>
            <div className={styles.header}>
              <div className={styles.date}>Date</div>
              <div className={styles.vendor}>Vendor</div>
              <div className={styles.amount}>Amount</div>
              <div className={styles.type}>Type</div>
              <div className={styles.actionsContainer}></div>
            </div>
            <div className={styles.listItemsContainer}>
              {expenses.length > 0 ? mappedExpenses : ''}
            </div>
            <div className={styles.footer}>
              <Paginator
                currPage={currPage}
                totalPages={totalPages}
                handlePrev={handlePrev}
                handleNext={handleNext}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <BottomNav>
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default ViewExpenses;
