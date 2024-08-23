import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Select from '../../components/forms/Select';
import { AxiosError } from 'axios';
import { notify } from '../../utils/toastify';
import dayjs from 'dayjs';
import useInput from '../../hooks/useInput';
import Input from '../../components/forms/Input';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import TextArea from '../../components/forms/TextArea';
import { updateShift } from '../../services/shiftServices';
import { IShift } from '../../interfaces/IShift.interface';
import { SelectOptions } from '../../types/SelectOptions';

type ShiftLoaderData = {
  clubNames: SelectOptions[];
  shift: IShift;
};

const ConfirmShiftDetails: FC = (): JSX.Element => {
  const [clubOptions, setClubOptions] = useState<SelectOptions[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const loaderData = useLoaderData() as ShiftLoaderData;
  const navigate = useNavigate();

  const { value: clubId, valueChangeHandler: clubIdChangeHandler } = useInput(
    (v) => v !== '',
    loaderData && loaderData.shift ? loaderData.shift.clubId : ''
  );

  const {
    value: start,
    isValid: startIsValid,
    hasError: startHasError,
    valueChangeHandler: startChangeHandler,
    inputBlurHandler: startBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    loaderData && loaderData.shift
      ? dayjs(loaderData.shift.start).format('YYYY-MM-DDTHH:mm')
      : dayjs().format('YYYY-MM-DDTHH:mm')
  );

  const {
    value: end,
    isValid: endIsValid,
    hasError: endHasError,
    valueChangeHandler: endChangeHandler,
    inputBlurHandler: endBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    loaderData && loaderData.shift
      ? dayjs(loaderData.shift.end).format('YYYY-MM-DDTHH:mm')
      : dayjs().add(4, 'hour').format('YYYY-MM-DDTHH:mm')
  );

  const { value: notes, valueChangeHandler: notesChangeHandler } = useInput(
    (v) => v !== '',
    loaderData && loaderData.shift ? loaderData.shift.notes : ''
  );

  const handleCancel = (): void => {
    navigate(-1);
  };
  const handleSubmit = async (): Promise<void> => {
    console.log('loader data ', loaderData.shift);
    console.log('inputs ', { clubId, start, end, notes });
    if (
      (loaderData.shift && loaderData.shift.clubId !== clubId) ||
      dayjs(loaderData.shift.start).format('YYYY-MM-DDTHH:mm') !== start ||
      dayjs(loaderData.shift.end).format('YYYY-MM-DDTHH:mm') !== end ||
      loaderData.shift.notes !== notes
    ) {
      try {
        setIsTransmitting(true);
        const payload: IShift = {
          _id: loaderData.shift._id,
          clubId,
          start,
          end,
          notes,
          incomeReported: loaderData.shift.incomeReported
            ? loaderData.shift.incomeReported
            : false,
        };
        notify('Shift Details Confirmed', 'success', 'confirm-shift-success');
        await updateShift(payload);
        navigate(`/confirm-shift/shift-income/${loaderData.shift._id}`);
      } catch (error) {
        console.error('Shift Confirm Error: ', error);
        if (error instanceof AxiosError)
          notify(error.response?.data.message, 'error', 'confirm-shift-error');
      } finally {
        setIsTransmitting(false);
      }
    } else {
      notify('Shift Details Confirmed', 'success', 'confirm-no-change-success');
      navigate(`/confirm-shift/shift-income/${loaderData.shift._id}`);
    }
  };

  useEffect(() => {
    setIsFormValid(startIsValid && endIsValid);
  }, [startIsValid, endIsValid]);

  useEffect(() => {
    if (loaderData) {
      if (loaderData instanceof AxiosError)
        notify('Error retrieving shift data. Try request again.');
      else {
        setClubOptions(loaderData.clubNames);
        // setShift(loaderData.shift);
      }
    }
  }, [loaderData]);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
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
          loading={isTransmitting}
          onClick={handleSubmit}
        />
      </BottomNav>
    </>
  );
};

export default ConfirmShiftDetails;
