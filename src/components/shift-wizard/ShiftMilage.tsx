import { FC, useEffect, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import Input from '../forms/Input';
import BottomNav from '../ui/BottomNav/BottomNav';
import Button from '../ui/Button/Button';
import useInput from '../../hooks/useInput';
import FormGroup from '../forms/FormGroup';
import Label from '../forms/Label';
import { IClub } from '../../interfaces/IClub.interface';
import { ShiftData } from '../../pages/CompleteShiftWizard/CompleteShiftWizard';

const ShiftMilage: FC<{
  goNext: (shiftData: ShiftData | null) => void;
  goBack: (shiftData: ShiftData | null) => void;
  shiftData: ShiftData | null;
  clubs: IClub[];
}> = ({ goNext, goBack, shiftData, clubs }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<ShiftData | null>(shiftData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const selectedClub: IClub | undefined = clubs.find(
    (club) => club._id === shiftData?.shiftInfo.clubId
  );
  const { defaults } = selectedClub as IClub;

  const {
    value: milage,
    isValid: milageIsValid,
    hasError: milageHasError,
    valueChangeHandler: milageChangeHandler,
    inputBlurHandler: milageBlurHandler,
  } = useInput<string>(
    (v) => /^[0-9]+$/.test(v) || v === '',
    shiftData?.shiftInfo.shiftComplete && shiftData?.shiftInfo.milage
      ? shiftData?.shiftInfo.milage.toString()
      : defaults.useDefaults
      ? defaults.distance.toString()
      : '0'
  );

  useEffect(() => {
    setUpdatedShift((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        shiftInfo: {
          ...prevState.shiftInfo,
          milage: +milage || 0,
        },
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
              placeholder='0'
              hasError={milageHasError}
              errorMessage='Amount must be zero or greater.'
              handleChange={milageChangeHandler}
              handleBlur={milageBlurHandler}
            />
          </FormGroup>
        </form>
      </div>
      <BottomNav>
        <Button text='Prev' btnStyle='primaryOutlined' onClick={handlePrev} />
        <Button
          text='Next'
          onClick={handleNext}
          btnStyle='primarySolid'
          enabled={isFormValid}
        />
      </BottomNav>
    </>
  );
};

export default ShiftMilage;
