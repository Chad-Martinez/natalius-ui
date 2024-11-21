import styles from './Dropdown.module.css';
import { Children, FC, PropsWithChildren, RefObject } from 'react';

type DropdownProps = {
  visible: boolean;
  headerText?: string;
  cbIndex?: (index: number) => void;
  textAlign?: 'left' | 'center' | 'right';
  dropdownRef: RefObject<HTMLUListElement>;
};

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  cbIndex,
  visible,
  children,
  dropdownRef,
  textAlign,
  headerText,
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
      {mappedChildren}
    </ul>
  );
};

export default Dropdown;
