import { FC, PropsWithChildren } from 'react';
import shiftWizardStyles from '../ShiftWizard.module.css';

const SummaryCard: FC<
  PropsWithChildren<{
    children?: JSX.Element[] | JSX.Element;
  }>
> = ({ children }) => {
  return <div className={shiftWizardStyles.summaryCard}>{children}</div>;
};

export default SummaryCard;
