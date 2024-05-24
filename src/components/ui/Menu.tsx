import { FC, SyntheticEvent, useContext } from 'react';
import styles from './Menu.module.css';
import MenuContainer from './MenuContainer';
import { MenuContext } from '../../layouts/ProtectedLayout';

const Menu: FC = (): JSX.Element => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  const toggleMenu = (event: SyntheticEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={styles.menu} onClick={toggleMenu}>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <MenuContainer open={isOpen} />
      </div>
    </>
  );
};

export default Menu;
