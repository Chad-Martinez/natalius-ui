import { FC, useContext } from 'react';
import styles from './NavMenu.module.css';
import Dropdown from '../../../ui/Dropdown/Dropdown';
import useDropdown from '../../../../hooks/useDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
// import { logout } from '../../../../services/authServices';
import { AuthContext } from '../../../../store/AuthContext';
import { LINKS } from '../../../../helpers/nav-menu-helpers';
import { DropdownProps } from '../TopNavMenus';
import useAxios from '../../../../hooks/useAxios';

const NavMenu: FC<DropdownProps> = ({
  openDropdowns,
  setOpenDropdowns,
}): JSX.Element => {
  const { isOpen, dropdownRef, buttonRef, toggleDropdown } = useDropdown();
  const { axiosInstance, boundAuthServices } = useAxios();
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await boundAuthServices.logout(axiosInstance);
    } catch (error) {
      console.error('Logout Error: ', error);
    } finally {
      sessionStorage.removeItem('at');
      setIsAuth(false);
      navigate('/');
    }
  };

  const handleDropdown = (): void => {
    setOpenDropdowns('menu');
    toggleDropdown();
  };

  const mappedLinks = LINKS.map((link, index) => {
    if (link.name === 'Logout') {
      return (
        <NavLink
          key={index}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to=''
          onClick={handleLogout}
        >
          {link.name}
        </NavLink>
      );
    } else {
      return (
        <NavLink
          key={index}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to={link.path}
        >
          {link.name}
        </NavLink>
      );
    }
  });

  return (
    <>
      <div ref={buttonRef} className={styles.menu} onClick={handleDropdown}>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        {openDropdowns === 'menu' && (
          <Dropdown
            children={mappedLinks}
            visible={isOpen}
            dropdownRef={dropdownRef}
            textAlign='center'
          />
        )}
      </div>
    </>
  );
};

export default NavMenu;
