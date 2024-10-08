import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/forms/Select';
import dayjs from 'dayjs';
import useInput from '../../hooks/useInput';
import Input from '../../components/forms/Input';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import TextArea from '../../components/forms/TextArea';
import { IShift } from '../../interfaces/IShift.interface';
import { SelectOptions } from '../../types/SelectOptions';

const ShiftDetails: FC<{
  goNext: (shift: IShift) => void;
  shiftData: IShift | null;
  clubOptions: SelectOptions[] | [];
}> = ({ goNext, shiftData, clubOptions }): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const { value: clubId, valueChangeHandler: clubIdChangeHandler } = useInput(
    (v) => v !== '',
    shiftData?.clubId
  );

  const {
    value: start,
    isValid: startIsValid,
    hasError: startHasError,
    valueChangeHandler: startChangeHandler,
    inputBlurHandler: startBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    dayjs(shiftData?.start).format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: end,
    isValid: endIsValid,
    hasError: endHasError,
    valueChangeHandler: endChangeHandler,
    inputBlurHandler: endBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    dayjs(shiftData?.end).format('YYYY-MM-DDTHH:mm')
  );

  const { value: notes, valueChangeHandler: notesChangeHandler } = useInput(
    (v) => v !== '',
    shiftData?.notes
  );

  useEffect(() => {
    setIsFormValid(startIsValid && endIsValid);
  }, [startIsValid, endIsValid]);

  const handleCancel = (): void => navigate(-1);

  const handleNext = (): void => {
    if (shiftData) {
      const updatedShift: IShift = {
        ...shiftData,
        clubId,
        start,
        end,
        notes,
      };
      goNext(updatedShift);
    }
  };

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Confirm Shift Details</h3>
          <FormGroup>
            <Label name='club' text='Club' />
            <Select
              name='club'
              defaultOptionName='Club'
              options={clubOptions}
              value={clubId}
              handleChange={clubIdChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label name='start' text='Shift Start' />
            <Input
              type='datetime-local'
              value={start}
              hasError={startHasError}
              errorMessage='Start date and time required'
              handleChange={startChangeHandler}
              handleBlur={startBlurHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label name='end' text='Shift End' />
            <Input
              type='datetime-local'
              value={end}
              hasError={endHasError}
              errorMessage='End date and time required'
              handleChange={endChangeHandler}
              handleBlur={endBlurHandler}
            />
          </FormGroup>
          <TextArea
            value={notes}
            placeholder='Notes...'
            rows={10}
            addedStyles={{
              minHeight: '95px',
            }}
            handleChange={notesChangeHandler}
          />
        </form>
      </div>
      <BottomNav>
        <Button text='Cancel' onClick={handleCancel} />
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

export default ShiftDetails;
