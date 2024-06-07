import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import pageStyles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import ViewExpensesList from './components/ViewExpensesList';
import { IExpense } from '../../interfaces/IExpense.interface';
import { paginatedExpenses } from '../../services/expensesService';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';
import styles from './ViewExpenses.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MenuContext } from '../../layouts/ProtectedLayout';

type PaginatedExpenses = { expenses: IExpense[]; count: number; pages: number };

const ViewExpenses: FC = (): JSX.Element => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [count, setCount] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const { showPopup, setShowPopup } = useContext(MenuContext);

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

  const handleAddExpense = () => {
    navigate('expense-form');
  };

  const handleMenu = (Y: number, X: number, id: string): void => {
    console.log('id ', id);
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
  };

  const handleDelete = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <>
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
          <li onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </li>
        </ul>
        <PageHeader linkRight='view-expenses' linkRightText='View Expenses' />
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
