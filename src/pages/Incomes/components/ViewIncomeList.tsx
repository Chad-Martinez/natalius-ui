import { FC } from 'react';
import styles from '../ViewIncome.module.css';
import { IIncome } from '../../../interfaces/IIncome.interface';
import Paginator from '../../../components/ui/Paginator/Paginator';
import ViewIncomeListItem from './ViewIncomeListItem';

type ViewIncomeProps = {
  incomes: IIncome[];
  currPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleMenu: (top: number, left: number, income: IIncome) => void;
};

const ViewIncomeList: FC<ViewIncomeProps> = ({
  incomes,
  currPage,
  totalPages,
  handlePrev,
  handleNext,
  handleMenu,
}): JSX.Element => {
  const mappedIncomes = incomes.map((income: IIncome) => (
    <ViewIncomeListItem
      key={income._id}
      income={income}
      handleMenu={handleMenu}
    />
  ));
  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <div className={styles.date}>Date</div>
        <div className={styles.club}>Club</div>
        <div className={styles.amount}>Amount</div>
        <div className={styles.actions}></div>
      </div>
      {incomes.length > 0 ? mappedIncomes : ''}
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
