import { FC } from 'react';
import styles from './MenuContainer.module.css';
import { NavLink } from 'react-router-dom';

const MenuContainer: FC<{ open: boolean }> = ({ open }): JSX.Element => {
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
        to='/gigs'
      >
        <li>Gigs</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/reports'
      >
        <li>Reports</li>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to='/profile'
      >
        <li>Profile</li>
      </NavLink>
      <NavLink to='/logout'>
        <li>Logout</li>
      </NavLink>
    </ul>
  );
};

export default MenuContainer;
