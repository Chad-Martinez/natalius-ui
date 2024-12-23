import { FC } from 'react';
import shiftWizardStyles from '../ShiftWizard.module.css';

const SummaryItem: FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <div className={shiftWizardStyles.summaryItem}>
      <div className={shiftWizardStyles.summaryItemName}>{name}: </div>
      {value}
    </div>
  );
};

export default SummaryItem;
