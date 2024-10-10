import { FC, useEffect, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import Input from '../forms/Input';
import BottomNav from '../dashboard/BottomNav';
import Button from '../ui/Button/Button';
import useInput from '../../hooks/useInput';
import FormGroup from '../forms/FormGroup';
import Label from '../forms/Label';
import { IShift } from '../../interfaces/IShift.interface';

const ShiftMilage: FC<{
  goNext: (shift: IShift | null) => void;
  goBack: (shift: IShift | null) => void;
  shiftData: IShift | null;
}> = ({ goNext, goBack, shiftData }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<IShift | null>(shiftData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const {
    value: milage,
    isValid: milageIsValid,
    hasError: milageHasError,
    valueChangeHandler: milageChangeHandler,
    inputBlurHandler: milageBlurHandler,
  } = useInput(
    (v) => v !== '',
    (shiftData?.milage && shiftData?.milage.toString()) || '0'
  );

  useEffect(() => {
    setUpdatedShift((prevShift) => {
      if (!prevShift) return prevShift;
      return {
        ...prevShift,
        milage: +milage,
      };
    });
  }, [milage]);

  useEffect(() => {
    setIsFormValid(milageIsValid);
  }, [milageIsValid]);

  const handlePrev = (): void => goBack(updatedShift);

  const handleNext = (): void => goNext(updatedShift);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Shift Milage</h3>
          <FormGroup>
            <Label name='milage' text='Round Trip Miles Driven' />
            <Input
              name='milage'
              type='number'
              autoFocus={true}
              min={0}
              value={milage}
              placeholder='Milage'
              hasError={milageHasError}
              errorMessage='Amount must be zero or greater.'
              handleChange={milageChangeHandler}
              handleBlur={milageBlurHandler}
            />
          </FormGroup>
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

export default ShiftMilage;
