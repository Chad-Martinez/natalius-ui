import { FC } from 'react';
import styles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

const Vendors: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddVendor = () => {
    navigate('vendor-form');
  };
  return (
    <>
      <div className={styles.mainContent}>Vendors</div>
      <BottomNav>
        <Button text='Add Vendor' onClick={handleAddVendor} />
      </BottomNav>
    </>
  );
};

export default Vendors;
