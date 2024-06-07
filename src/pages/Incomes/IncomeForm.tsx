import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import Input from '../../components/forms/Input';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import Select from '../../components/forms/Select';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { notify } from '../../utils/toastify';
import { AxiosError } from 'axios';
import useInput from '../../hooks/useInput';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { addIncome } from '../../services/incomeServices';
import { IShift } from '../../interfaces/IShift.interface';
import { getShiftsByGig } from '../../services/shiftServices';
import { IIncomeBase } from '../../interfaces/IIncome.interface';
import { SelectOptions } from '../../types/SelectOptions';
dayjs.extend(utc);

const IncomeForm: FC = (): JSX.Element => {
  const [gigOptions, setGigOptions] = useState<SelectOptions[]>([]);
  const [shiftOptions, setShiftOPtions] = useState<SelectOptions[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const shift: IShift = location.state?.shift;

  const loaderData = useLoaderData();

  const {
    value: gigId,
    isValid: gigIdIsValid,
    hasError: gigIdHasError,
    valueChangeHandler: gigIdChangeHandler,
    inputBlurHandler: gigIdBlurHandler,
  } = useInput((v) => v !== '', shift ? shift.gigId : '');

  const {
    value: shiftId,
    isValid: shiftIdIsValid,
    hasError: shiftIdHasError,
    valueChangeHandler: shiftIdChangeHandler,
    inputBlurHandler: shiftIdBlurHandler,
  } = useInput((v) => v !== '', shift ? shift._id : '');

  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput((v) => dayjs(v).isValid(), dayjs().utc().format('YYYY-MM-DD'));

  const {
    value: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput((v) => v !== '');

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
  } = useInput((v) => v !== '');

  useEffect(() => {
    if (loaderData instanceof AxiosError) {
      notify(loaderData.response?.data.message, 'error', 'gignames-error');
    } else {
      setGigOptions(loaderData as SelectOptions[]);
    }
  }, [loaderData]);

  useEffect(() => {
    (async () => {
      if (gigId !== '') {
        try {
          const { data } = await getShiftsByGig(gigId);
          const options = data.map((shift: IShift) => {
            return {
              _id: shift._id,
              name: dayjs(shift.start).utc().format('dddd: MMMM D, YYYY'),
            };
          });
          setShiftOPtions(options);
        } catch (error) {
          console.error('Get Shifts Error: ', error);
          if (error instanceof AxiosError)
            notify(error.response?.data.message, 'error', 'get-shifts-error');
        }
      }
    })();
  }, [gigId]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      const payload: IIncomeBase = {
        gigId,
        date,
        amount,
        type,
      };
      if (shiftId) {
        payload.shiftId = shiftId;
        const shiftDate = shiftOptions.find((option) => option._id === shiftId);
        if (shiftDate) payload.date = shiftDate?.name;
      }
      await addIncome(payload);
      notify('Income added', 'success', 'add-income-success');
      navigate(-1);
    } catch (error) {
      console.error('Income Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'add-income-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  useEffect(() => {
    if (shiftOptions.length > 0)
      setIsFormValid(
        gigIdIsValid && shiftIdIsValid && amountIsValid && typeIsValid
      );
    else
      setIsFormValid(
        gigIdIsValid && dateIsValid && amountIsValid && typeIsValid
      );
  }, [
    gigIdIsValid,
    shiftIdIsValid,
    dateIsValid,
    amountIsValid,
    typeIsValid,
    shiftOptions.length,
  ]);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Income</h3>
          <Select
            name='gig'
            defaultOptionName='Gig'
            options={gigOptions}
            value={gigId}
            hasError={gigIdHasError}
            link='/gigs/gig-form'
            linkText='Add Gig'
            errorMessage='Gig required'
            handleChange={gigIdChangeHandler}
            handleBlur={gigIdBlurHandler}
          />
          {shiftOptions.length > 0 ? (
            <Select
              name='shift'
              defaultOptionName='Shift'
              options={shiftOptions}
              value={shiftId}
              hasError={shiftIdHasError}
              errorMessage='Shift required'
              handleChange={shiftIdChangeHandler}
              handleBlur={shiftIdBlurHandler}
            />
          ) : (
            <Input
              name='date'
              type='date'
              value={date}
              hasError={dateHasError}
              errorMessage='Date required'
              handleChange={dateChangeHandler}
              handleBlur={dateBlurHandler}
            />
          )}
          <Input
            id='amount'
            name='amount'
            value={amount}
            hasError={amountHasError}
            placeholder='Enter earnings'
            min={0.01}
            type='number'
            errorMessage='Amount must be greater than $0.01'
            handleChange={amountChangeHandler}
            handleBlur={amountBlurHandler}
          />
          <Select
            name='type'
            defaultOptionName='Payment Type'
            options={[
              { _id: 'CASH', name: 'CASH' },
              { _id: 'CREDIT', name: 'CREDIT' },
              { _id: 'CHECK', name: 'CHECK' },
            ]}
            value={type}
            hasError={typeHasError}
            errorMessage='Payment type required'
            handleChange={typeChangeHandler}
            handleBlur={typeBlurHandler}
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

export default IncomeForm;
