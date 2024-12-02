import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import Button from '../../components/ui/Button/Button';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Select from '../../components/forms/Select';
import { AxiosError } from 'axios';
import { notify } from '../../helpers/toast-helpers';
import dayjs from 'dayjs';
import useInput from '../../hooks/useInput';
import Input from '../../components/forms/Input';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import TextArea from '../../components/forms/TextArea';
import { addShift, updateShift } from '../../services/shiftServices';
import { IShift, IShiftBase } from '../../interfaces/IShift.interface';
import { SelectOptions } from '../../types/SelectOptions';
import {
  getUserTimezone,
  roundToNearestQuarter,
  TIMEZONE_SELECT,
} from '../../helpers/date-time-helpers';
import { IClub } from '../../interfaces/IClub.interface';

const ShiftForm: FC = (): JSX.Element => {
  const [clubOptions, setClubOptions] = useState<SelectOptions[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const { clubId: club } = useParams();
  const loaderData = useLoaderData() as IClub[];
  const navigate = useNavigate();
  const location = useLocation();

  const shift: IShift = location.state?.shift;

  const {
    value: clubId,
    isValid: clubIdIsValid,
    hasError: clubIdHasError,
    inputBlurHandler: clubIdBlurHandler,
    valueChangeHandler: clubIdChangeHandler,
  } = useInput<string>(
    (v) => v !== '',
    shift ? shift.clubId : club ? club : ''
  );

  const {
    value: start,
    isValid: startIsValid,
    hasError: startHasError,
    valueChangeHandler: startChangeHandler,
    inputBlurHandler: startBlurHandler,
  } = useInput<string>(
    (v) => dayjs(v).isValid(),
    shift
      ? dayjs.utc(shift.start).tz(shift.timezone).format('YYYY-MM-DDTHH:mm')
      : roundToNearestQuarter().add(2, 'hour').format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: end,
    isValid: endIsValid,
    hasError: endHasError,
    valueChangeHandler: endChangeHandler,
    inputBlurHandler: endBlurHandler,
  } = useInput<string>(
    (v) => dayjs(v).isValid() && !dayjs(v).isSameOrBefore(dayjs(start)),
    shift
      ? dayjs.utc(shift.end).tz(shift.timezone).format('YYYY-MM-DDTHH:mm')
      : roundToNearestQuarter().add(4, 'hour').format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: timezone,
    inputBlurHandler: timezoneBlurHandler,
    valueChangeHandler: timezoneChangeHandler,
  } = useInput<string>(
    (v) => v !== '',
    shift ? shift.timezone : getUserTimezone()
  );

  const { value: notes, valueChangeHandler: notesChangeHandler } =
    useInput<string>((v) => v !== '', shift?.notes ? shift.notes : '');

  const handleCancel = (): void => navigate(-1);

  const handleSubmit = async (): Promise<void> => {
    setIsTransmitting(true);
    try {
      const startWithTZ = dayjs.tz(start, timezone);
      const endWithTZ = dayjs.tz(end, timezone);
      const payload: IShiftBase = {
        clubId,
        start: dayjs(startWithTZ).utc().format(),
        end: dayjs(endWithTZ).utc().format(),
        timezone,
        notes,
        shiftComplete:
          shift && shift.shiftComplete ? shift.shiftComplete : false,
      };

      if (shift) {
        const updatedShift: IShift = {
          ...payload,
          _id: shift._id,
        };
        await updateShift(updatedShift);
        notify('Shift updated', 'success', 'update-shift-success');
      } else {
        await addShift(payload);
        notify('Shift added', 'success', 'add-shift-success');
      }
      navigate(-1);
    } catch (error) {
      console.error('Shift Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'add-shift-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleClubNameChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedClub = loaderData.find(
      (club) => club._id === event.target.value
    );

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

  useEffect(() => {
    setIsFormValid(clubIdIsValid && startIsValid && endIsValid);
  }, [clubIdIsValid, startIsValid, endIsValid]);

  useEffect(() => {
    if (loaderData instanceof AxiosError)
      notify(loaderData.response?.data.message);
    else {
      setClubOptions(loaderData as SelectOptions[]);
    }
  }, [loaderData]);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>
            {shift && shift._id ? 'Edit' : 'Add'} Shift
          </h3>
          <Select
            name='club'
            defaultOptionName='Club'
            autoFocus={true}
            options={clubOptions}
            value={clubId}
            hasError={clubIdHasError}
            handleBlur={clubIdBlurHandler}
            errorMessage='Club required'
            handleChange={handleClubNameChange}
          />
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
          text='Submit'
          onClick={handleSubmit}
          btnStyle='primarySolid'
          enabled={isFormValid}
          loading={isTransmitting}
        />
      </BottomNav>
    </>
  );
};

export default ShiftForm;
