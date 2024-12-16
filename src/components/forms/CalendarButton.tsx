import { FC } from 'react';
import formStyles from './FormComponents.module.css';

const CalendarButton: FC<{ showPicker?: () => void }> = ({ showPicker }) => {
  return (
    <button
      type='button'
      className={formStyles.calendarButton}
      onClick={showPicker}
      tabIndex={-1}
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  );
};

export default CalendarButton;
