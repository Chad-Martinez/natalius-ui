import { FC } from 'react';
import pageStyles from '../PageWrapper.module.css';
import shiftSummaryStyles from './ShiftSummary.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { IShift } from '../../interfaces/IShift.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { SelectOptions } from '../../types/SelectOptions';
dayjs.extend(localizedFormat);

const ShiftSummary: FC<{
  goNext: (shift: IShift | null) => void;
  goBack: (shift: IShift | null, jumpToStep?: number) => void;
  onFinish: () => void;
  isTransmitting: boolean;
  shiftData: IShift | null;
  clubOptions: SelectOptions[] | [];
}> = ({
  goBack,
  shiftData,
  clubOptions,
  onFinish,
  isTransmitting,
}): JSX.Element => {
  const handlePrev = (): void => goBack(shiftData);

  const handleCompleteShift = (): void => onFinish();

  const club: SelectOptions | undefined = clubOptions.find(
    (club) => club._id === shiftData?.clubId
  );

  return (
    <>
      <div className={pageStyles.mainContent}>
        <div className={shiftSummaryStyles.summaryContainer}>
          <h2>Shift Summary</h2>
          <div className={shiftSummaryStyles.detailsCard}>
            <div className={shiftSummaryStyles.detailsHeader}>
              <div className={shiftSummaryStyles.detailsTitle}>
                Shift Details
              </div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 0)}
              />
            </div>
            <div className={shiftSummaryStyles.detailsItemContainer}>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>Club: </div>
                {club ? club.name : ''}
              </div>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>Start:</div>
                {dayjs(shiftData?.start).format('llll')}
              </div>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>End:</div>
                {dayjs(shiftData?.end).format('llll')}
              </div>
            </div>
          </div>
          <div className={shiftSummaryStyles.detailsCard}>
            <div className={shiftSummaryStyles.detailsHeader}>
              <div className={shiftSummaryStyles.detailsTitle}>Income</div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 1)}
              />
            </div>
            <div className={shiftSummaryStyles.detailsItemContainer}>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>
                  Earnings:
                </div>
                ${shiftData?.income?.amount}
              </div>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>Type: </div>
                {shiftData?.income?.type.toLowerCase()}
              </div>
            </div>
          </div>
          <div className={shiftSummaryStyles.detailsCard}>
            <div className={shiftSummaryStyles.detailsHeader}>
              <div className={shiftSummaryStyles.detailsTitle}>Expenses</div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 2)}
              />
            </div>
            <div className={shiftSummaryStyles.detailsItemContainer}>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>
                  Floor Fee:
                </div>
                ${shiftData?.expenses?.floorFee}
              </div>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>
                  Pvt Fee:
                </div>
                ${shiftData?.expenses?.dances.danceFeeTotal}
              </div>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>Tips: </div>
                ${shiftData?.expenses?.tips}
              </div>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>Other:</div>
                ${shiftData?.expenses?.other}
              </div>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>Total:</div>
                ${shiftData?.expenses?.totalShiftExpenses}
              </div>
            </div>
          </div>
          <div className={shiftSummaryStyles.detailsCard}>
            <div
              className={`${shiftSummaryStyles.detailsHeader} ${shiftSummaryStyles.netIncome}`}
            >
              <div className={shiftSummaryStyles.detailsTitle}>
                Net Income: $
                {shiftData?.income?.amount &&
                shiftData?.expenses?.totalShiftExpenses
                  ? shiftData?.income?.amount -
                    shiftData?.expenses?.totalShiftExpenses
                  : 0}
              </div>
            </div>
          </div>
          <div className={shiftSummaryStyles.detailsCard}>
            <div className={shiftSummaryStyles.detailsHeader}>
              <div className={shiftSummaryStyles.detailsTitle}>Milage</div>
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => goBack(shiftData, 3)}
              />
            </div>
            <div className={shiftSummaryStyles.detailsItemContainer}>
              <div className={shiftSummaryStyles.detailsItem}>
                <div className={shiftSummaryStyles.detailsItemName}>
                  Round Trip:
                </div>
                {shiftData?.milage}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav>
        <Button text='Prev' onClick={handlePrev} />
        <Button
          text='Finish'
          solid={true}
          loading={isTransmitting}
          onClick={handleCompleteShift}
        />
      </BottomNav>
    </>
  );
};

export default ShiftSummary;
