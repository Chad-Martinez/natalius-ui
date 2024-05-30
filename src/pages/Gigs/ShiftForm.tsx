import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Select from '../../components/forms/Select';
import { GigName } from '../../types/Gig';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';
import dayjs from 'dayjs';
import useInput from '../../hooks/useInput';
import Input from '../../components/forms/Input';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import TextArea from '../../components/forms/TextArea';
import { addShift } from '../../services/shiftServices';

const ShiftForm: FC = (): JSX.Element => {
  const [gigOptions, setGigOptions] = useState<GigName[] | undefined>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const { gig } = useParams();
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  const { value: gigId, valueChangeHandler: gigIdChangeHandler } = useInput(
    (v) => v !== '',
    gig
  );

  const {
    value: start,
    isValid: startIsValid,
    hasError: startHasError,
    valueChangeHandler: startChangeHandler,
    inputBlurHandler: startBlurHandler,
  } = useInput((v) => dayjs(v).isValid(), dayjs().format('YYYY-MM-DDTHH:mm'));

  const {
    value: end,
    isValid: endIsValid,
    hasError: endHasError,
    valueChangeHandler: endChangeHandler,
    inputBlurHandler: endBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    dayjs().add(4, 'hour').format('YYYY-MM-DDTHH:mm')
  );

  const { value: notes, valueChangeHandler: notesChangeHandler } = useInput(
    (v) => v !== ''
  );

  const handleCancel = (): void => {
    navigate(-1);
  };
  const handleSubmit = async (): Promise<void> => {
    setIsTransmitting(true);
    try {
      await addShift({ gigId, start, end, notes });
      notify('Shift added', 'success', 'add-shift-success');
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
      setGigOptions(loaderData as GigName[]);
    }
  }, [loaderData]);

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default ShiftForm;
