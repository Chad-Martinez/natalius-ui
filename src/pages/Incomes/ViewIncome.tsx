import {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import pageStyles from '../PageWrapper.module.css';
import styles from './ViewIncome.module.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal/Modal';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuContext } from '../../layouts/ProtectedLayout';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IIncome } from '../../interfaces/IIncome.interface';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import ViewIncomeList from './components/ViewIncomeList';
import { deleteIncome, paginatedIncome } from '../../services/incomeServices';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';

type PaginatedIncome = { income: IIncome[]; count: number; pages: number };

const ViewIncome: FC = (): JSX.Element => {
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const [income, setIncome] = useState<IIncome | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [count, setCount] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const { showPopup, setShowPopup } = useContext(MenuContext);
  const dialogRef = useRef<IHTMLDialogElement | null>(null);

  const navigate = useNavigate();

  const incomeData = useLoaderData() as PaginatedIncome;

  useEffect(() => {
    if (incomeData) {
      setIncomes(incomeData.income);
      setTotalPages(incomeData.pages);
      setCount(incomeData.count);
      setCurrPage(1);
    }
  }, [incomeData]);

  useEffect(() => {
    if (!showPopup && income) setIncome(null);
  }, [showPopup, income]);

  const handleAddIncome = () => {
    navigate('/income/income-form');
  };

  const handleMenu = (Y: number, X: number, income: IIncome): void => {
    setIncome(income);
    setTop(Y);
    setLeft(X - 52);
    setShowPopup(true);
  };

  const handlePrev = async (): Promise<void> => {
    try {
      const { data } = await paginatedIncome(currPage - 1, 10);
      setIncomes(data.income);
      setCurrPage((prevPage) => prevPage - 1);
      if (+data.count !== count) setCount(+data.count);
      if (+data.pages !== totalPages) setTotalPages(+data.pages);
    } catch (error) {
      console.error('Paginated Income Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'paginate-income-error');
    }
  };

  const handleNext = async (): Promise<void> => {
    try {
      const { data } = await paginatedIncome(currPage + 1, 10);
      setIncomes(data.income);
      setCurrPage((prevPage) => prevPage + 1);
      if (+data.count !== count) setCount(+data.count);
      if (+data.pages !== totalPages) setTotalPages(+data.pages);
    } catch (error) {
      console.error('Paginated Income Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'paginate-income-error');
    }
  };

  const handleEdit = (event: SyntheticEvent): void => {
    event.stopPropagation();
    navigate('/income/income-form', { state: { income } });
  };

  const openModal = (event: SyntheticEvent): void => {
    event.stopPropagation();
    dialogRef.current?.openModal();
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (income?._id) {
        const { data } = await deleteIncome(income._id);
        const response = await paginatedIncome(currPage, 10);
        setIncomes(response.data.income);
        notify(data.message, 'success', 'delete-income-success');
      }
    } catch (error) {
      console.error('Delete Income Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'delete-income-error');
    } finally {
      dialogRef.current?.closeModal();
    }
  };

  return (
    <>
      <Modal
        ref={dialogRef}
        title='Delete Income'
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
        {incomes ? (
          <ViewIncomeList
            incomes={incomes}
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
        <Button text='Add Income' onClick={handleAddIncome} />
      </BottomNav>
    </>
  );
};

export default ViewIncome;
