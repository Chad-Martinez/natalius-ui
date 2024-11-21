import { FC } from 'react';
import Logo from '../ui/Logo/Logo';
import styles from './TopNav.module.css';
import { useNavigate } from 'react-router-dom';
import TopNavMenus from './TopNavMenus/TopNavMenus';

const TopNav: FC<{ title: string }> = ({ title }): JSX.Element => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/dashboard');

  return (
    <div className={styles.nav}>
      <div className={styles.navCenterContainer}>
        <div className={styles.navSideContainer}>
          <Logo
            addedStyles={{ width: '46px', cursor: 'pointer' }}
            clickHandler={handleNavigate}
          />
        </div>
        <h1>{title}</h1>
        <div className={styles.navSideContainer}>
          <TopNavMenus />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
