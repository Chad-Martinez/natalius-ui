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

  const shiftIncomeType = shiftData?.shiftInfo.income?.type.toLowerCase();

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

  const netIncome =
    shiftData?.shiftInfo.income?.amount &&
    shiftData?.shiftInfo.expenses?.totalShiftExpenses
      ? shiftData?.shiftInfo.income?.amount -
        shiftData?.shiftInfo.expenses?.totalShiftExpenses
      : 0;

  const imageName = shiftData?.image?.name || 'No Image';

  const milage = shiftData?.shiftInfo.milage;

  return (
    <>
      <div className={pageStyles.mainContent}>
        <div className={shiftWizardStyles.summaryContainer}>
          <h2>Shift Summary</h2>
          <div className={shiftWizardStyles.detailsCard}>
            <div className={shiftWizardStyles.detailsHeader}>
              <div className={shiftWizardStyles.detailsTitle}>
                Shift Details
              </div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 0)}
              />
            </div>
            <div className={shiftWizardStyles.detailsItemContainer}>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>Club: </div>
                {clubName}
              </div>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>Start:</div>
                {shiftStart}
              </div>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>End:</div>
                {shiftEnd}
              </div>
            </div>
          </div>
          <div className={shiftWizardStyles.detailsCard}>
            <div className={shiftWizardStyles.detailsHeader}>
              <div className={shiftWizardStyles.detailsTitle}>Income</div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 1)}
              />
            </div>
            <div className={shiftWizardStyles.detailsItemContainer}>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>
                  Earnings:
                </div>
                {shiftIncome}
              </div>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>Type: </div>
                {shiftIncomeType}
              </div>
            </div>
          </div>
          <div className={shiftWizardStyles.detailsCard}>
            <div className={shiftWizardStyles.detailsHeader}>
              <div className={shiftWizardStyles.detailsTitle}>Expenses</div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 2)}
              />
            </div>
            <div className={shiftWizardStyles.detailsItemContainer}>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>
                  Floor Fee:
                </div>
                {floorFee}
              </div>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>
                  Pvt Fee:
                </div>
                {pvtFee}
              </div>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>Tips: </div>
                {tips}
              </div>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>Other:</div>
                {other}
              </div>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>Total:</div>
                {total}
              </div>
            </div>
          </div>
          <div className={shiftWizardStyles.detailsCard}>
            <div
              className={`${shiftWizardStyles.detailsHeader} ${shiftWizardStyles.netIncome}`}
            >
              <div className={shiftWizardStyles.detailsTitle}>
                Net Income: ${netIncome}
              </div>
            </div>
          </div>
          <div className={shiftWizardStyles.detailsCard}>
            <div className={shiftWizardStyles.detailsHeader}>
              <div className={shiftWizardStyles.detailsTitle}>
                Receipt Image
              </div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 3)}
              />
            </div>
            <div className={shiftWizardStyles.detailsItemContainer}>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>Image:</div>
                {imageName}
              </div>
            </div>
          </div>
          <div className={shiftWizardStyles.detailsCard}>
            <div className={shiftWizardStyles.detailsHeader}>
              <div className={shiftWizardStyles.detailsTitle}>Milage</div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 4)}
              />
            </div>
            <div className={shiftWizardStyles.detailsItemContainer}>
              <div className={shiftWizardStyles.detailsItem}>
                <div className={shiftWizardStyles.detailsItemName}>
                  Round Trip:
                </div>
                {milage}
              </div>
            </div>
          </div>
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
