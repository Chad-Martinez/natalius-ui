import { FC } from 'react';
import styles from '../PageWrapper.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Vendors: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleAddVendor = () => {
    navigate('vendor-form');
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>Vendors</div>
      <BottomNav>
        <Button text='Add Vendor' onClick={handleAddVendor} />
      </BottomNav>
    </div>
  );
};

export default Vendors;