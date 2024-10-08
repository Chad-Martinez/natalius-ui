import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import shiftExpensesStyles from './ShiftExpenses.module.css';
import Input from '../../components/forms/Input';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import useInput from '../../hooks/useInput';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import { IShift } from '../../interfaces/IShift.interface';

const ShiftExpenses: FC<{
  goNext: (shift: IShift | null) => void;
  goBack: (shift: IShift | null) => void;
  shiftData: IShift | null;
}> = ({ goNext, goBack, shiftData }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<IShift | null>(shiftData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [danceFeeTotal, setDanceFeeTotal] = useState<string>('0');
  const [totalShiftExpenses, setTotalShiftExpenses] = useState<number>(0);

  const {
    value: floorFee,
    isValid: floorFeeIsValid,
    hasError: floorFeeHasError,
    valueChangeHandler: floorFeeChangeHandler,
    inputBlurHandler: floorFeeBlurHandler,
  } = useInput(
    (v) => v !== '',
    shiftData?.expenses?.floorFee.toString() || '0'
  );

  const {
    value: numOfDances,
    isValid: numOfDancesIsValid,
    hasError: numOfDancesHasError,
    valueChangeHandler: numOfDancesChangeHandler,
    inputBlurHandler: numOfDancesBlurHandler,
  } = useInput(
    (v) => v !== '',
    shiftData?.expenses?.dances.numOfDances.toString() || '0'
  );

  const {
    value: pricePerDance,
    isValid: pricePerDanceIsValid,
    hasError: pricePerDanceHasError,
    valueChangeHandler: pricePerDanceChangeHandler,
    inputBlurHandler: pricePerDanceBlurHandler,
  } = useInput(
    (v) => v !== '',
    shiftData?.expenses?.dances.pricePerDance.toString() || '0'
  );

  const {
    value: tips,
    isValid: tipsIsValid,
    hasError: tipsHasError,
    valueChangeHandler: tipsChangeHandler,
    inputBlurHandler: tipsBlurHandler,
  } = useInput((v) => v !== '', shiftData?.expenses?.tips.toString() || '0');

  const {
    value: other,
    isValid: otherIsValid,
    hasError: otherHasError,
    valueChangeHandler: otherChangeHandler,
    inputBlurHandler: otherBlurHandler,
  } = useInput((v) => v !== '', shiftData?.expenses?.other.toString() || '0');

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
          type: 'SERVICE',
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
    setDanceFeeTotal((+numOfDances * +pricePerDance).toString());
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

  const handlePrev = (): void => goBack(updatedShift);

  const handleNext = (): void => goNext(updatedShift);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Shift Expenses</h3>
          <FormGroup>
            <Label name='floorFee' text='Floor Fee' />
            <Input
              name='floorFee'
              type='number'
              min={0}
              autoFocus={true}
              value={floorFee}
              placeholder='Floor Fee'
              hasError={floorFeeHasError}
              errorMessage='Amount must be zero or greater.'
              handleChange={floorFeeChangeHandler}
              handleBlur={floorFeeBlurHandler}
            />
          </FormGroup>
          <div className={shiftExpensesStyles.feeContainer}>
            <FormGroup>
              <Label name='numOfDances' text='# Pvt Dances' />
              <Input
                name='numOfDances'
                type='number'
                min={0}
                value={numOfDances}
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
                type='number'
                min={1}
                placeholder='$ per Pvt'
                value={pricePerDance}
                hasError={pricePerDanceHasError}
                errorMessage='Amount must be $1.00 or greater.'
                handleChange={pricePerDanceChangeHandler}
                handleBlur={pricePerDanceBlurHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label name='danceFeeTotal' text='Pvt Fee Total' />
              <Input
                name='danceFeeTotal'
                type='number'
                disabled={true}
                value={danceFeeTotal}
              />
            </FormGroup>
          </div>
          <div className={shiftExpensesStyles.feeContainer}>
            <FormGroup>
              <Label name='tips' text='Tips' />
              <Input
                name='tips'
                type='number'
                min={0}
                placeholder='Tips'
                value={tips}
                hasError={tipsHasError}
                errorMessage='Amount must be zero or greater.'
                handleChange={tipsChangeHandler}
                handleBlur={tipsBlurHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label name='other' text='Other Expenses' />
              <Input
                name='other'
                value={other}
                placeholder='Other Expenses'
                hasError={otherHasError}
                min={0}
                type='number'
                errorMessage='Amount must be zero or greater.'
                handleChange={otherChangeHandler}
                handleBlur={otherBlurHandler}
              />
            </FormGroup>
          </div>
          <div className={shiftExpensesStyles.totalExpenses}>
            Total Shift Expenses: ${totalShiftExpenses}
          </div>
        </form>
      </div>
      <BottomNav>
        <Button text='Prev' onClick={handlePrev} />
        <Button
          text='Next'
          solid={true}
          disabled={!isFormValid}
          onClick={handleNext}
        />
      </BottomNav>
    </>
  );
};

export default ShiftExpenses;
