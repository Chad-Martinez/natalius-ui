import { FC, PropsWithChildren, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Card.module.css';

const CardContentAccordian: FC<
  PropsWithChildren<{ text: string; icon: IconDefinition; enabled: boolean }>
> = ({ text, icon, enabled, children }): JSX.Element => {
  const [showAccordian, setShowAccordian] = useState<boolean>(false);

  const handleAccordian = (): void => {
    if (enabled) setShowAccordian(!showAccordian);
  };

  return (
    <>
      <div className={styles.cardContentItem}>
        <FontAwesomeIcon icon={icon} />
        <span>{text}</span>
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`${styles.shiftChevron} ${
            showAccordian && styles.rotateChevron
          }`}
          onClick={handleAccordian}
        />
      </div>
      <div
        className={`${styles.accordianContainer} ${
          showAccordian && styles.expandAccordianContainer
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default CardContentAccordian;
