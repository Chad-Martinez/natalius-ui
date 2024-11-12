import { FC } from 'react';
import styles from './TopNav.module.css';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import { useNavigate } from 'react-router-dom';

const TopNav: FC<{ title: string }> = ({ title }): JSX.Element => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/dashboard');

  return (
    <div className={styles.nav}>
      <div className={styles.navContainer}>
        <Logo
          addedStyles={{ width: '40px', margin: '0px', cursor: 'pointer' }}
          clickHandler={handleNavigate}
        />
        <h1>{title}</h1>
        <Menu />
      </div>
    </div>
  );
};

export default TopNav;
