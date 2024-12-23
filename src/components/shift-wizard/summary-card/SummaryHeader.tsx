import { FC, PropsWithChildren } from 'react';
import shiftWizardStyles from '../ShiftWizard.module.css';

const SummaryHeader: FC<
  PropsWithChildren<{
    title: string;
    children?: JSX.Element;
  }>
> = ({ title, children }) => {
  return (
    <div className={shiftWizardStyles.summaryHeader}>
      <div className={shiftWizardStyles.summaryTitle}>{title}</div>
      {children}
    </div>
  );
};

export default SummaryHeader;
