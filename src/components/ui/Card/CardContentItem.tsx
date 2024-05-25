import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './Card.module.css';

const CardContentItem: FC<{ text: string; icon: IconDefinition }> = ({
  text,
  icon,
}): JSX.Element => {
  return (
    <div className={styles.cardContentItem}>
      <FontAwesomeIcon icon={icon} />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default CardContentItem;
