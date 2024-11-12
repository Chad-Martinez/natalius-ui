import { FC, useEffect, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import BottomNav from '../ui/BottomNav/BottomNav';
import Button from '../ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import Select from '../forms/Select';
import dayjs from 'dayjs';
import useInput from '../../hooks/useInput';
import Input from '../forms/Input';
import FormGroup from '../forms/FormGroup';
import Label from '../forms/Label';
import TextArea from '../forms/TextArea';
import { IShift } from '../../interfaces/IShift.interface';
import { SelectOptions } from '../../types/SelectOptions';
import { TIMEZONE_SELECT } from '../../helpers/date-time-helpers';

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
    dayjs
      .utc(shiftData?.start)
      .tz(shiftData?.timezone)
      .format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: end,
    isValid: endIsValid,
    hasError: endHasError,
    valueChangeHandler: endChangeHandler,
    inputBlurHandler: endBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    dayjs.utc(shiftData?.end).tz(shiftData?.timezone).format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: timezone,
    inputBlurHandler: timezoneBlurHandler,
    valueChangeHandler: timezoneChangeHandler,
  } = useInput((v) => v !== '', shiftData?.timezone);

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
      const startWithTZ = dayjs.tz(start, timezone);
      const endWithTZ = dayjs.tz(end, timezone);
      const updatedShift: IShift = {
        ...shiftData,
        clubId,
        start: dayjs(startWithTZ).utc().format(),
        end: dayjs(endWithTZ).utc().format(),
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
          <Select
            name='timezone'
            defaultOptionName={'Timezone'}
            options={TIMEZONE_SELECT}
            value={timezone}
            handleBlur={timezoneBlurHandler}
            handleChange={timezoneChangeHandler}
          />
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
