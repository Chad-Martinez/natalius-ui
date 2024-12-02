import { FC, useEffect, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import shiftExpensesStyles from './ShiftExpenses.module.css';
import Input from '../forms/Input';
import BottomNav from '../ui/BottomNav/BottomNav';
import Button from '../ui/Button/Button';
import useInput from '../../hooks/useInput';
import FormGroup from '../forms/FormGroup';
import Label from '../forms/Label';
import { IShift } from '../../interfaces/IShift.interface';
import { IClub } from '../../interfaces/IClub.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  moneyFormatter,
  moneyStrToNumFormatter,
} from '../../helpers/format-helpers';

const ShiftExpenses: FC<{
  goNext: (shift: IShift | null) => void;
  goBack: (shift: IShift | null) => void;
  shiftData: IShift | null;
  clubs: IClub[];
  onFinish: (shift: IShift) => void;
}> = ({ goNext, goBack, shiftData, clubs, onFinish }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<IShift | null>(shiftData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [danceFeeTotal, setDanceFeeTotal] = useState<string>('0');
  const [totalShiftExpenses, setTotalShiftExpenses] = useState<number>(0);

  const selectedClub = clubs.find((club) => club._id === shiftData?.clubId);
  const { defaults } = selectedClub as IClub;

  const location = useLocation();
  const navigate = useNavigate();

  const {
    value: floorFee,
    isValid: floorFeeIsValid,
    hasError: floorFeeHasError,
    valueChangeHandler: floorFeeChangeHandler,
    inputBlurHandler: floorFeeBlurHandler,
  } = useInput<string>(
    (v) => v !== '',
    shiftData?.shiftComplete && shiftData?.expenses?.floorFee
      ? shiftData?.expenses?.floorFee.toString()
      : defaults.useDefaults
      ? defaults.floorFee.toString()
      : '0'
  );

  const {
    value: numOfDances,
    isValid: numOfDancesIsValid,
    hasError: numOfDancesHasError,
    valueChangeHandler: numOfDancesChangeHandler,
    inputBlurHandler: numOfDancesBlurHandler,
  } = useInput<string>(
    (v) => v !== '',
    (shiftData?.shiftComplete &&
      shiftData?.expenses?.dances.numOfDances.toString()) ||
      '0'
  );

  const {
    value: pricePerDance,
    isValid: pricePerDanceIsValid,
    hasError: pricePerDanceHasError,
    valueChangeHandler: pricePerDanceChangeHandler,
    inputBlurHandler: pricePerDanceBlurHandler,
  } = useInput<string>(
    (v) => v !== '',
    shiftData?.shiftComplete && shiftData?.expenses?.dances.pricePerDance
      ? shiftData?.expenses?.dances.pricePerDance.toString()
      : defaults.useDefaults
      ? defaults.pricePerDance.toString()
      : '0'
  );

  const {
    value: tips,
    isValid: tipsIsValid,
    hasError: tipsHasError,
    valueChangeHandler: tipsChangeHandler,
    inputBlurHandler: tipsBlurHandler,
  } = useInput<string>(
    (v) => v !== '',
    shiftData?.shiftComplete && shiftData?.expenses?.tips
      ? shiftData?.expenses?.tips.toString()
      : defaults.useDefaults
      ? defaults.tips.toString()
      : '0'
  );

  const {
    value: other,
    isValid: otherIsValid,
    hasError: otherHasError,
    valueChangeHandler: otherChangeHandler,
    inputBlurHandler: otherBlurHandler,
  } = useInput<string>(
    (v) => v !== '',
    shiftData?.shiftComplete && shiftData?.expenses?.other
      ? shiftData?.expenses?.other.toString()
      : defaults.useDefaults
      ? defaults.other.toString()
      : '0'
  );

  useEffect(() => {
    setUpdatedShift((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        expenses: {
          floorFee: +floorFee,
          dances: {
            numOfDances: +numOfDances,
            pricePerDance: +pricePerDance,
            danceFeeTotal: +danceFeeTotal,
          },
          tips: +tips,
          other: +other,
          totalShiftExpenses: +totalShiftExpenses,
          type: 'SHIFT',
        },
      };
    });
  }, [
    floorFee,
    numOfDances,
    pricePerDance,
    danceFeeTotal,
    tips,
    other,
    totalShiftExpenses,
  ]);

  useEffect(() => {
    setDanceFeeTotal(moneyFormatter(+numOfDances * +pricePerDance));
  }, [numOfDances, pricePerDance]);

  useEffect(() => {
    setTotalShiftExpenses(+floorFee + +danceFeeTotal + +tips + +other);
  }, [floorFee, danceFeeTotal, tips, other]);

  useEffect(() => {
    setIsFormValid(
      floorFeeIsValid &&
        numOfDancesIsValid &&
        pricePerDanceIsValid &&
        tipsIsValid &&
        otherIsValid
    );
  }, [
    floorFeeIsValid,
    numOfDancesIsValid,
    pricePerDanceIsValid,
    tipsIsValid,
    otherIsValid,
  ]);

  const handleCancel = (): void => navigate(-1);

  const handlePrev = (): void => goBack(updatedShift);

  const handleUpdate = (): void => {
    if (!updatedShift) return;
    onFinish(updatedShift);
  };

  const handleNext = (): void => goNext(updatedShift);

  const convertAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = moneyStrToNumFormatter(event.target.value).toString();
    event.target.value = value;
    const inputName = event.target.name;
    switch (inputName) {
      case 'floorFee':
        floorFeeChangeHandler(event);
        break;
      case 'pricePerDance':
        pricePerDanceChangeHandler(event);
        break;
      case 'tips':
        tipsChangeHandler(event);
        break;
      case 'other':
        otherChangeHandler(event);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>
            {shiftData?.shiftComplete ? 'Update' : 'Add'} Shift Expenses
          </h3>
          <FormGroup>
            <Label name='floorFee' text='Floor Fee' />
            <Input
              name='floorFee'
              type='text'
              autoFocus={true}
              value={`$${moneyFormatter(+floorFee)}`}
              placeholder='Floor Fee'
              hasError={floorFeeHasError}
              errorMessage='Amount must be zero or greater.'
              handleChange={convertAmount}
              handleBlur={floorFeeBlurHandler}
            />
          </FormGroup>
          <div className={shiftExpensesStyles.feeContainer}>
            <FormGroup>
              <Label name='numOfDances' text='# Pvt Dances' />
              <Input
                name='numOfDances'
                type='text'
                value={moneyFormatter(+numOfDances)}
                placeholder='# Pvt Dances'
                hasError={numOfDancesHasError}
                errorMessage='Number must be zero or greater.'
                handleChange={numOfDancesChangeHandler}
                handleBlur={numOfDancesBlurHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label name='pricePerDance' text='$ per Pvt' />
              <Input
                name='pricePerDance'
                type='text'
                placeholder='$ per Pvt'
                value={`$${moneyFormatter(+pricePerDance)}`}
                hasError={pricePerDanceHasError}
                errorMessage='Amount must be $1 or greater.'
                handleChange={convertAmount}
                handleBlur={pricePerDanceBlurHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label name='danceFeeTotal' text='Pvt Fee Total' />
              <Input
                name='danceFeeTotal'
                type='text'
                disabled={true}
                value={`$${danceFeeTotal}`}
              />
            </FormGroup>
          </div>
          <div className={shiftExpensesStyles.feeContainer}>
            <FormGroup>
              <Label name='tips' text='Tips' />
              <Input
                name='tips'
                type='text'
                placeholder='Tips'
                value={`$${moneyFormatter(+tips)}`}
                hasError={tipsHasError}
                errorMessage='Amount must be zero or greater.'
                handleChange={convertAmount}
                handleBlur={tipsBlurHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label name='other' text='Other Expenses' />
              <Input
                name='other'
                value={`$${moneyFormatter(+other)}`}
                placeholder='Other Expenses'
                hasError={otherHasError}
                type='text'
                errorMessage='Amount must be zero or greater.'
                handleChange={convertAmount}
                handleBlur={otherBlurHandler}
              />
            </FormGroup>
          </div>
          <div className={shiftExpensesStyles.totalExpenses}>
            Total Shift Expenses: {`$${moneyFormatter(totalShiftExpenses)}`}
          </div>
        </form>
      </div>
      <BottomNav>
        <Button
          btnStyle='primaryOutlined'
          text={location.state?.goToPage ? 'Cancel' : 'Prev'}
          onClick={location.state?.goToPage ? handleCancel : handlePrev}
        />
        <Button
          btnStyle='primarySolid'
          enabled={isFormValid}
          text={location.state?.goToPage ? 'Update' : 'Next'}
          onClick={location.state?.goToPage ? handleUpdate : handleNext}
        />
      </BottomNav>
    </>
  );
};

export default ShiftExpenses;
