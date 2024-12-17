import styles from './Dropdown.module.css';
import { Children, FC, PropsWithChildren, RefObject } from 'react';

type DropdownProps = {
  visible: boolean;
  headerText?: string;
  cbIndex?: (index: number) => void;
  textAlign?: 'left' | 'center' | 'right';
  dropdownRef: RefObject<HTMLUListElement>;
  noItemText?: string;
};

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  cbIndex,
  visible,
  children,
  dropdownRef,
  textAlign,
  headerText,
  noItemText,
}): JSX.Element => {
  const mappedChildren = Children.map(children, (child, index) => {
    const handleIndex = () => {
      cbIndex && cbIndex(index);
    };
    return (
      <li key={index} className={styles.dropdownItem} onClick={handleIndex}>
        {child}
      </li>
    );
  });
  return (
    <ul
      ref={dropdownRef}
      style={textAlign && { textAlign: textAlign }}
      className={`${styles.dropdownMenu} ${visible ? styles.visible : ''}`}
    >
      {headerText ? (
        <li
          className={styles.dropdownHeader}
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {headerText}
        </li>
      ) : (
        ''
      )}
      {Children.count(children) > 0 ? (
        mappedChildren
      ) : (
        <li
          key='no-item'
          className={`${styles.dropdownItem} ${styles.inactive}`}
        >
          {noItemText}
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
