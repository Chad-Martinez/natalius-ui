import { FC, useContext } from 'react';
import styles from './MenuContainer.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authServices';
import { AuthContext } from '../../../store/AuthContext';

const MenuContainer: FC<{ open: boolean }> = ({ open }): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout Error: ', error);
    } finally {
      sessionStorage.removeItem('at');
      setIsAuth(false);
      navigate('/');
    }
  };

  return (
    <ul className={`${styles.container} ${open && styles.open}`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/dashboard'
      >
        <li>Dashboard</li>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/income'
      >
        <li>Income</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/expenses'
      >
        <li>Expenses</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/clubs'
      >
        <li>Clubs</li>
      </NavLink>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  );
};

export default MenuContainer;
