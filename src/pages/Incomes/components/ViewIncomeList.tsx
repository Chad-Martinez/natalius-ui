import { FC } from 'react';
import styles from '../ViewIncome.module.css';
import Paginator from '../../../components/ui/Paginator/Paginator';
import ViewIncomeListItem from './ViewIncomeListItem';
import { IShift } from '../../../interfaces/IShift.interface';

type ViewIncomeProps = {
  shifts: IShift[];
  currPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleMenu: (top: number, left: number, shift: IShift) => void;
};

const ViewIncomeList: FC<ViewIncomeProps> = ({
  shifts,
  currPage,
  totalPages,
  handlePrev,
  handleNext,
  handleMenu,
}): JSX.Element => {
  const mappedIncomes = shifts.map((shift: IShift) => (
    <ViewIncomeListItem key={shift._id} shift={shift} handleMenu={handleMenu} />
  ));
  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <div className={styles.date}>Date</div>
        <div className={styles.club}>Club</div>
        <div className={styles.amount}>Amount</div>
        <div className={styles.actions}></div>
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
  );
};

export default ViewIncomeList;
