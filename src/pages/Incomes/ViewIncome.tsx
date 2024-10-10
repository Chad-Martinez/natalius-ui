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
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import ViewIncomeList from './components/ViewIncomeList';
import { paginatedIncome } from '../../services/incomeServices';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';
import { IShift } from '../../interfaces/IShift.interface';
import { deleteShift } from '../../services/shiftServices';

type PaginatedIncome = { shiftIncome: IShift[]; count: number; pages: number };

const ViewIncome: FC = (): JSX.Element => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [shift, setShift] = useState<IShift | null>(null);
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
      setShifts(incomeData.shiftIncome);
      setTotalPages(incomeData.pages);
      setCount(incomeData.count);
      setCurrPage(1);
    }
  }, [incomeData]);

  const handleMenu = (Y: number, X: number, shift: IShift): void => {
    setShift(shift);
    setTop(Y);
    setLeft(X - 52);
    setShowPopup(true);
  };

  const handlePrev = async (): Promise<void> => {
    try {
      const { data } = await paginatedIncome(currPage - 1, 10);
      setShifts(data.shiftIncome);
      setCurrPage((prevPage) => prevPage - 1);
      if (+data.count !== count) setCount(+data.count);
      if (+data.pages !== totalPages) setTotalPages(+data.pages);
    } catch (error) {
      console.error('Paginated Income Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'paginate-shift-error');
    }
  };

  const handleNext = async (): Promise<void> => {
    try {
      const { data } = await paginatedIncome(currPage + 1, 10);

      setShifts(data.shiftIncome);
      setCurrPage((prevPage) => prevPage + 1);
      if (+data.count !== count) setCount(+data.count);
      if (+data.pages !== totalPages) setTotalPages(+data.pages);
    } catch (error) {
      console.error('Paginated Income Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'paginate-shift-error');
    }
  };

  const handleEdit = (event: SyntheticEvent): void => {
    event.stopPropagation();
    navigate(`/complete-shift/${shift?._id}`, { state: { goToPage: 1 } });
    setShowPopup(false);
  };

  const openModal = (event: SyntheticEvent): void => {
    event.stopPropagation();
    dialogRef.current?.openModal();
    setShowPopup(false);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (shift?._id) {
        const { data } = await deleteShift({
          shiftId: shift?._id,
          clubId: shift?.clubId,
        });
        const response = await paginatedIncome(currPage, 10);
        setShifts(response.data.shiftIncome);
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
        title='Delete Shift'
        subtitle='This action will delete the shift and all its data. It cannot be undone'
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
        {shifts ? (
          <ViewIncomeList
            shifts={shifts}
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
    </>
  );
};

export default ViewIncome;
