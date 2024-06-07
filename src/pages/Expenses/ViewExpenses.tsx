import {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import pageStyles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import ViewExpensesList from './components/ViewExpensesList';
import { IExpense } from '../../interfaces/IExpense.interface';
import {
  deleteExpense,
  paginatedExpenses,
} from '../../services/expensesService';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';
import styles from './ViewExpenses.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MenuContext } from '../../layouts/ProtectedLayout';
import Modal from '../../components/ui/Modal/Modal';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';

type PaginatedExpenses = { expenses: IExpense[]; count: number; pages: number };

const ViewExpenses: FC = (): JSX.Element => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [expense, setExpense] = useState<IExpense | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [count, setCount] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const { showPopup, setShowPopup } = useContext(MenuContext);
  const dialogRef = useRef<IHTMLDialogElement | null>(null);

  const navigate = useNavigate();

  const expenseData = useLoaderData() as PaginatedExpenses;

  useEffect(() => {
    if (expenseData) {
      setExpenses(expenseData.expenses);
      setTotalPages(expenseData.pages);
      setCount(expenseData.count);
      setCurrPage(1);
    }
  }, [expenseData]);

  useEffect(() => {
    if (!showPopup && expense) setExpense(null);
  }, [showPopup, expense]);

  const handleAddExpense = () => {
    navigate('/expenses/expense-form');
  };

  const handleMenu = (Y: number, X: number, expense: IExpense): void => {
    setExpense(expense);
    setTop(Y);
    setLeft(X - 52);
    setShowPopup(true);
  };

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

  const handleEdit = (event: SyntheticEvent) => {
    event.stopPropagation();
    navigate('/expenses/expense-form', { state: { expense } });
  };

  const openModal = (event: SyntheticEvent): void => {
    event.stopPropagation();
    dialogRef.current?.openModal();
  };

  const handleDelete = async () => {
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

  return (
    <>
      <Modal
        ref={dialogRef}
        title='Delete Expense?'
        subtitle='This action cannot be undone'
        onConfirm={handleDelete}
      />
      <div className={pageStyles.mainContent}>
        <ul
          style={{ top: `${top}px`, left: `${left}px` }}
          className={`${styles.ellipsisMenuContainer} ${
            showPopup ? styles.open : ''
          }`}
        >
          <li onClick={handleEdit}>
            <FontAwesomeIcon icon={faPencil} />
          </li>
          <li onClick={openModal}>
            <FontAwesomeIcon icon={faTrash} />
          </li>
        </ul>
        <PageHeader
          linkLeftText='Go back'
          linkLeftHandleClick={() => navigate(-1)}
        />
        {expenses ? (
          <ViewExpensesList
            expenses={expenses}
            currPage={currPage}
            totalPages={totalPages}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleMenu={handleMenu}
          />
        ) : (
          ''
        )}
      </div>
      <BottomNav>
        <Button text='Add Expense' onClick={handleAddExpense} />
      </BottomNav>
    </>
  );
};

export default ViewExpenses;
