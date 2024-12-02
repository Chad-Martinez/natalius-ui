import { ChangeEvent, FC, useEffect, useState } from 'react';
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
import { TIMEZONE_SELECT } from '../../helpers/date-time-helpers';
import { IClub } from '../../interfaces/IClub.interface';

const ShiftDetails: FC<{
  goNext: (shift: IShift) => void;
  shiftData: IShift | null;
  clubs: IClub[] | [];
}> = ({ goNext, shiftData, clubs }): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const { value: clubId, valueChangeHandler: clubIdChangeHandler } =
    useInput<string>((v) => v !== '', shiftData?.clubId || '');

  const {
    value: start,
    isValid: startIsValid,
    hasError: startHasError,
    valueChangeHandler: startChangeHandler,
    inputBlurHandler: startBlurHandler,
  } = useInput<string>(
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
  } = useInput<string>(
    (v) => dayjs(v).isValid() && !dayjs(v).isSameOrBefore(dayjs(start)),
    dayjs.utc(shiftData?.end).tz(shiftData?.timezone).format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: timezone,
    inputBlurHandler: timezoneBlurHandler,
    valueChangeHandler: timezoneChangeHandler,
  } = useInput<string>((v) => v !== '', shiftData?.timezone || '');

  const { value: notes, valueChangeHandler: notesChangeHandler } =
    useInput<string>((v) => v !== '', shiftData?.notes || '');

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

  const handleClubNameChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedClub = clubs.find((club) => club._id === event.target.value);

    if (selectedClub && selectedClub.defaults.useDefaults) {
      const newEvent = {
        ...event,
        target: {
          ...event.target,
          value: selectedClub.defaults.timezone || '',
        },
      };
      timezoneChangeHandler(newEvent);
    }
    clubIdChangeHandler(event);
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
              options={clubs}
              value={clubId}
              handleChange={handleClubNameChange}
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
              errorMessage='End date and time must be after Start'
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
        <Button
          text='Cancel'
          btnStyle='primaryOutlined'
          onClick={handleCancel}
        />
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

export default ShiftDetails;
