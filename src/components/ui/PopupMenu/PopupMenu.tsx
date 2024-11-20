import { createPortal } from 'react-dom';
import styles from './PopupMenu.module.css';
import { FC, PropsWithChildren, RefObject } from 'react';

interface PopupMenu {
  top: number;
  left: number;
  menuRef: RefObject<HTMLUListElement>;
}

const PopupMenu: FC<PropsWithChildren<PopupMenu>> = ({
  top,
  left,
  menuRef,
  children,
}) => {
  return createPortal(
    <ul
      ref={menuRef}
      style={{ top: `${top}px`, left: `${left}px` }}
      className={`${styles.ellipsisMenuContainer} ${styles.open}`}
    >
      {children}
    </ul>,
    document.getElementById('popup-menu') || document.body
  );
};

export default PopupMenu;
