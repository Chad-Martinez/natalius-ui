import { FC, useEffect, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import Input from '../forms/Input';
import BottomNav from '../ui/BottomNav/BottomNav';
import Button from '../ui/Button/Button';
import useInput from '../../hooks/useInput';
import FormGroup from '../forms/FormGroup';
import Label from '../forms/Label';
import { IShift } from '../../interfaces/IShift.interface';
import { IClub } from '../../interfaces/IClub.interface';

const ShiftMilage: FC<{
  goNext: (shift: IShift | null) => void;
  goBack: (shift: IShift | null) => void;
  shiftData: IShift | null;
  clubs: IClub[];
}> = ({ goNext, goBack, shiftData, clubs }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<IShift | null>(shiftData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const selectedClub: IClub | undefined = clubs.find(
    (club) => club._id === shiftData?.clubId
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
    shiftData?.shiftComplete && shiftData?.milage
      ? shiftData?.milage.toString()
      : defaults.useDefaults
      ? defaults.distance.toString()
      : '0'
  );

  useEffect(() => {
    setUpdatedShift((prevShift) => {
      if (!prevShift) return prevShift;
      return {
        ...prevShift,
        milage: +milage || 0,
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
