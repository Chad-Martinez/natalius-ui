import { FC } from 'react';
import pageStyles from '../../pages/PageWrapper.module.css';
import shiftWizardStyles from './ShiftWizard.module.css';
import BottomNav from '../ui/BottomNav/BottomNav';
import Button from '../ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { IClub } from '../../interfaces/IClub.interface';
import { digitGroupingFormatter } from '../../helpers/format-helpers';
import { ShiftData } from '../../pages/CompleteShiftWizard/CompleteShiftWizard';
import SummaryHeader from './summary-card/SummaryHeader';
import SummaryItem from './summary-card/SummaryItem';
import SummaryItemContainer from './summary-card/SummaryItemContainer';
import SummaryCard from './summary-card/SummaryCard';

const ShiftSummary: FC<{
  goNext: (shiftData: ShiftData | null) => void;
  goBack: (shiftData: ShiftData | null, jumpToStep?: number) => void;
  onFinish: () => Promise<void>;
  isTransmitting: boolean;
  shiftData: ShiftData | null;
  clubs: IClub[] | [];
}> = ({ goBack, shiftData, clubs, onFinish, isTransmitting }): JSX.Element => {
  const handlePrev = (): void => goBack(shiftData);

  const handleCompleteShift = (): Promise<void> => onFinish();

  const club: IClub | undefined = clubs.find(
    (club) => club._id === shiftData?.shiftInfo.clubId
  );

  const clubName = club ? club.name : '';

  const shiftStart = dayjs
    .utc(shiftData?.shiftInfo.start)
    .tz(shiftData?.shiftInfo.timezone)
    .format('llll');

  const shiftEnd = dayjs
    .utc(shiftData?.shiftInfo.end)
    .tz(shiftData?.shiftInfo.timezone)
    .format('llll');

  const shiftIncome = `$${digitGroupingFormatter(
    shiftData?.shiftInfo.income?.amount
  )}`;

  const shiftIncomeType =
    shiftData?.shiftInfo.income?.type.toLowerCase() || 'N/A';

  const floorFee = `$${digitGroupingFormatter(
    shiftData?.shiftInfo.expenses?.floorFee
  )}`;

  const pvtFee = `$${digitGroupingFormatter(
    shiftData?.shiftInfo.expenses?.dances.danceFeeTotal
  )}`;

  const tips = `$${digitGroupingFormatter(
    shiftData?.shiftInfo.expenses?.tips
  )}`;

  const other = `$${digitGroupingFormatter(
    shiftData?.shiftInfo.expenses?.other
  )}`;

  const total = `$${digitGroupingFormatter(
    shiftData?.shiftInfo.expenses?.totalShiftExpenses
  )}`;

  const netIncome = `$${digitGroupingFormatter(
    shiftData?.shiftInfo.income?.amount &&
      shiftData?.shiftInfo.expenses?.totalShiftExpenses
      ? shiftData?.shiftInfo.income?.amount -
          shiftData?.shiftInfo.expenses?.totalShiftExpenses
      : 0
  )}`;

  const imageName = shiftData?.image?.name || 'No Image';

  const milage = shiftData?.shiftInfo.milage || 0;

  return (
    <>
      <div className={pageStyles.mainContent}>
        <div className={shiftWizardStyles.summaryContent}>
          <h2>Shift Summary</h2>
          <SummaryCard>
            <SummaryHeader
              title='Shift Details'
              children={
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => goBack(shiftData, 0)}
                />
              }
            />
            <SummaryItemContainer>
              <SummaryItem name='Club' value={clubName} />
              <SummaryItem name='Start' value={shiftStart} />
              <SummaryItem name='End' value={shiftEnd} />
            </SummaryItemContainer>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader
              title='Income'
              children={
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => goBack(shiftData, 1)}
                />
              }
            />
            <SummaryItemContainer>
              <SummaryItem name='Earnings' value={shiftIncome} />
              <SummaryItem name='Type' value={shiftIncomeType} />
            </SummaryItemContainer>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader
              title='Expenses'
              children={
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => goBack(shiftData, 2)}
                />
              }
            />
            <SummaryItemContainer>
              <SummaryItem name='Floor Fee' value={floorFee} />
              <SummaryItem name='Pvt Fee' value={pvtFee} />
              <SummaryItem name='Tips' value={tips} />
              <SummaryItem name='Other' value={other} />
              <SummaryItem name='Total' value={total} />
            </SummaryItemContainer>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader title={`Net Income: ${netIncome}`} />
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader
              title='Receipt Image'
              children={
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => goBack(shiftData, 3)}
                />
              }
            />
            <SummaryItemContainer>
              <SummaryItem name='Image' value={imageName} />
            </SummaryItemContainer>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader
              title='Milage'
              children={
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => goBack(shiftData, 4)}
                />
              }
            />
            <SummaryItemContainer>
              <SummaryItem name='Round Trip' value={milage} />
            </SummaryItemContainer>
          </SummaryCard>
        </div>
      </div>
      <BottomNav>
        <Button text='Prev' btnStyle='primaryOutlined' onClick={handlePrev} />
        <Button
          text='Finish'
          btnStyle='primarySolid'
          loading={isTransmitting}
          onClick={handleCompleteShift}
        />
      </BottomNav>
    </>
  );
};

export default ShiftSummary;
