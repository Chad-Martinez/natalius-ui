import {
  FC,
  useRef,
  useState,
  useEffect,
  ReactElement,
  SyntheticEvent,
} from 'react';
import { AxiosError } from 'axios';
import styles from './ViewIncome.module.css';
import pageStyles from '../PageWrapper.module.css';
import Modal from '../../components/ui/Modal/Modal';
import { notify } from '../../helpers/toast-helpers';
import { IShift } from '../../interfaces/IShift.interface';
import { deleteShift } from '../../services/shiftServices';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { paginatedIncome } from '../../services/incomeServices';
import Paginator from '../../components/ui/Paginator/Paginator';
import ViewIncomeListItem from './components/ViewIncomeListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IHTMLDialogElement } from '../../interfaces/IHTMLDialog.interface';

type PaginatedIncome = { shiftIncome: IShift[]; count: number; pages: number };

type MenuRefs = {
  [key: string]: { closeMenu?: () => void } | null;
};

const ViewIncome: FC = (): JSX.Element => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [shift, setShift] = useState<IShift | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [count, setCount] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  const menuRefs = useRef<MenuRefs>({});
  const dialogRef = useRef<IHTMLDialogElement | null>(null);

  const navigate = useNavigate();

  const closeAllMenus = (): void => {
    Object.values(menuRefs.current).forEach(
      (ref) => ref?.closeMenu && ref?.closeMenu()
    );
  };

  const incomeData = useLoaderData() as PaginatedIncome;

  useEffect(() => {
    if (incomeData) {
      setShifts(incomeData.shiftIncome);
      setTotalPages(incomeData.pages);
      setCount(incomeData.count);
      setCurrPage(1);
    }
  }, [incomeData]);

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

  const openModal = (event: SyntheticEvent): void => {
    event.stopPropagation();
    dialogRef.current?.openModal();
    closeAllMenus();
  };

  const handleEdit = (): void =>
    navigate(`/complete-shift/${shift?._id}`, { state: { goToPage: 1 } });

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

  const mappedIncomes: JSX.Element[] = shifts.map((shift: IShift) => (
    <ViewIncomeListItem
      key={shift._id}
      shift={shift}
      menuItems={PopupMenuItems}
      setShift={setShift}
      ref={(el) => {
        if (el) {
          menuRefs.current[shift._id] = el;
        } else {
          delete menuRefs.current[shift._id];
        }
      }}
    />
  ));

  return (
    <>
      <Modal
        ref={dialogRef}
        title='Delete Shift'
        subtitle='This action will delete the shift and all its data. It cannot be undone'
        onConfirm={handleDelete}
      />
      <div className={pageStyles.mainContent}>
        <PageHeader
          linkLeftText='Go back'
          linkLeftHandleClick={() => navigate(-1)}
        />
        {shifts ? (
          <div className={styles.listContainer}>
            <div className={styles.header}>
              <div className={styles.date}>Date</div>
              <div className={styles.club}>Club</div>
              <div className={styles.amount}>Amount</div>
              <div className={styles.actionsContainer}></div>
            </div>
            <div className={styles.listItemsContainer}>
              {shifts.length > 0 ? mappedIncomes : ''}
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
    </>
  );
};

export default ViewIncome;
