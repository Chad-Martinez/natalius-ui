import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Select from '../../components/forms/Select';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import useInput from '../../hooks/useInput';
import Input from '../../components/forms/Input';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import TextArea from '../../components/forms/TextArea';
import { addShift, updateShift } from '../../services/shiftServices';
import { IShift, IShiftBase } from '../../interfaces/IShift.interface';
import { SelectOptions } from '../../types/SelectOptions';
dayjs.extend(utc);

const ShiftForm: FC = (): JSX.Element => {
  const [gigOptions, setGigOptions] = useState<SelectOptions[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const { gig } = useParams();
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const shift: IShift = location.state?.shift;

  const { value: gigId, valueChangeHandler: gigIdChangeHandler } = useInput(
    (v) => v !== '',
    gig ? gig : ''
  );

  const {
    value: start,
    isValid: startIsValid,
    hasError: startHasError,
    valueChangeHandler: startChangeHandler,
    inputBlurHandler: startBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    shift
      ? dayjs(shift.start).utc().format('YYYY-MM-DDTHH:mm')
      : dayjs().utc().format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: end,
    isValid: endIsValid,
    hasError: endHasError,
    valueChangeHandler: endChangeHandler,
    inputBlurHandler: endBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    shift
      ? dayjs(shift.end).utc().format('YYYY-MM-DDTHH:mm')
      : dayjs().add(4, 'hour').utc().format('YYYY-MM-DDTHH:mm')
  );

  const { value: notes, valueChangeHandler: notesChangeHandler } = useInput(
    (v) => v !== '',
    shift ? shift.notes : ''
  );

  const handleCancel = (): void => {
    navigate(-1);
  };
  const handleSubmit = async (): Promise<void> => {
    setIsTransmitting(true);
    try {
      const payload: IShiftBase = {
        gigId,
        start,
        end,
        notes,
        incomeReported:
          shift && shift.incomeReported ? shift.incomeReported : false,
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

  useEffect(() => {
    setIsFormValid(startIsValid && endIsValid);
  }, [startIsValid, endIsValid]);

  useEffect(() => {
    if (loaderData instanceof AxiosError)
      notify(loaderData.response?.data.message);
    else {
      setGigOptions(loaderData as SelectOptions[]);
    }
  }, [loaderData]);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Shift</h3>
          <Select
            name='gig'
            defaultOptionName='Gig'
            options={gigOptions}
            value={gigId}
            handleChange={gigIdChangeHandler}
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
          text='Submit'
          solid={true}
          disabled={!isFormValid}
          loading={isTransmitting}
          onClick={handleSubmit}
        />
      </BottomNav>
    </>
  );
};

export default ShiftForm;
