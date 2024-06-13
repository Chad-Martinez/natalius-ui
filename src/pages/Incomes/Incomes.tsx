import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import widgetStyles from '../../styles/Widget.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import AveragesWidget from './components/AveragesWidget';

const Incomes: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddIncome = () => {
    navigate('income-form');
  };
  return (
    <>
      <div className={pageStyles.mainContent}>
        <PageHeader linkRight='view-income' linkRightText='View Income' />
        <div className={widgetStyles.widgetContainer}>
          <AveragesWidget />
        </div>
      </div>
      <BottomNav>
        <Button text='Add Income' onClick={handleAddIncome} />
      </BottomNav>
    </>
  );
};

export default Incomes;
