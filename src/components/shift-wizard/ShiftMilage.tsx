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
import {
  digitGroupingFormatter,
  sanitizeStrToNum,
} from '../../helpers/format-helpers';

const ShiftMilage: FC<{
  goNext: (shiftData: ShiftData | null) => void;
  goBack: (shiftData: ShiftData | null) => void;
  shiftData: ShiftData | null;
  clubs: IClub[];
}> = ({ goNext, goBack, shiftData, clubs }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<ShiftData | null>(shiftData);

  const selectedClub: IClub | undefined = clubs.find(
    (club) => club._id === shiftData?.shiftInfo.clubId
  );
  const { defaults } = selectedClub as IClub;

  const { value: milage, valueChangeHandler: milageChangeHandler } =
    useInput<string>(
      (v) => sanitizeStrToNum(v) >= 0,
      shiftData?.shiftInfo.shiftComplete && shiftData?.shiftInfo.milage
        ? shiftData?.shiftInfo.milage.toString()
        : defaults.useDefaults
        ? defaults.milage.toString()
        : '0'
    );

  useEffect(() => {
    setUpdatedShift((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        shiftInfo: {
          ...prevState.shiftInfo,
          milage: +milage,
        },
      };
    });
  }, [milage]);

  const handlePrev = (): void => goBack(updatedShift);

  const handleNext = (): void => goNext(updatedShift);

  const convertAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = sanitizeStrToNum(event.target.value).toString();
    event.target.value = value;
    milageChangeHandler(event);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Shift Milage</h3>
          <FormGroup>
            <Label name='milage' text='Round Trip Miles Driven' />
            <Input
              name='milage'
              autoFocus={true}
              value={digitGroupingFormatter(milage)}
              placeholder='0'
              handleChange={convertAmount}
            />
          </FormGroup>
        </form>
      </div>
      <BottomNav>
        <Button text='Prev' btnStyle='primaryOutlined' onClick={handlePrev} />
        <Button text='Next' onClick={handleNext} btnStyle='primarySolid' />
      </BottomNav>
    </>
  );
};

export default ShiftMilage;
