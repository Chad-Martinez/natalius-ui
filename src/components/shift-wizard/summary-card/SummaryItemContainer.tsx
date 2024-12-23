import { FC, PropsWithChildren } from 'react';
import shiftWizardStyles from '../ShiftWizard.module.css';

const SummaryItemContainer: FC<
  PropsWithChildren<{
    children?: JSX.Element[] | JSX.Element;
  }>
> = ({ children }) => {
  return (
    <div className={shiftWizardStyles.summaryItemContainer}>{children}</div>
  );
};

export default SummaryItemContainer;
