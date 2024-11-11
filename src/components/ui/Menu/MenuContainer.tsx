import { FC, useContext } from 'react';
import styles from './MenuContainer.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authServices';
import { AuthContext } from '../../../store/AuthContext';
import { MenuContext } from '../../../layouts/ProtectedLayout';

const MenuContainer: FC<{ open: boolean }> = ({ open }): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);
  const { setShowPopup } = useContext(MenuContext);
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
        onClick={() => setShowPopup(false)}
      >
        <li>Dashboard</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/profile'
        onClick={() => setShowPopup(false)}
      >
        <li>Profile</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/income'
        onClick={() => setShowPopup(false)}
      >
        <li>Income</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/expenses'
        onClick={() => setShowPopup(false)}
      >
        <li>Expenses</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/clubs'
        onClick={() => setShowPopup(false)}
      >
        <li>Clubs</li>
      </NavLink>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  );
};

export default MenuContainer;
