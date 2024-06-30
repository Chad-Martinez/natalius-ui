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
import { addIncome, updateIncome } from '../../services/incomeServices';
import { IShift } from '../../interfaces/IShift.interface';
import { getShiftsByClub } from '../../services/shiftServices';
import { IIncome, IIncomeBase } from '../../interfaces/IIncome.interface';
import { SelectOptions } from '../../types/SelectOptions';

const IncomeForm: FC = (): JSX.Element => {
  const [clubOptions, setClubOptions] = useState<SelectOptions[]>([]);
  const [shiftOptions, setShiftOPtions] = useState<SelectOptions[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const income: IIncome = location.state?.income;
  const shift: IShift = location.state?.shift;

  const loaderData = useLoaderData();

  const {
    value: clubId,
    isValid: clubIdIsValid,
    hasError: clubIdHasError,
    valueChangeHandler: clubIdChangeHandler,
    inputBlurHandler: clubIdBlurHandler,
  } = useInput(
    (v) => v !== '',
    income ? income.clubId : shift ? shift.clubId : ''
  );

  const {
    value: shiftId,
    isValid: shiftIdIsValid,
    hasError: shiftIdHasError,
    valueChangeHandler: shiftIdChangeHandler,
    inputBlurHandler: shiftIdBlurHandler,
  } = useInput(
    (v) => v !== '',
    income ? income.shiftId : shift ? shift._id : ''
  );

  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    income
      ? dayjs(income.date).format('YYYY-MM-DD')
      : shift
      ? dayjs(shift.start).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD')
  );

  const {
    value: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput((v) => v !== '', income ? income.amount.toString() : '');

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
  } = useInput((v) => v !== '', income ? income.type : '');

  useEffect(() => {
    if (loaderData instanceof AxiosError) {
      notify(loaderData.response?.data.message, 'error', 'clubnames-error');
    } else {
      setClubOptions(loaderData as SelectOptions[]);
    }
  }, [loaderData]);

  useEffect(() => {
    (async () => {
      if (clubId !== '') {
        try {
          const { data } = await getShiftsByClub(clubId);
          const options = data.map((shift: IShift) => {
            return {
              _id: shift._id,
              name: dayjs(shift.start).format('dddd: MMMM D, YYYY'),
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
  }, [clubId]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      const payload: IIncomeBase = {
        clubId,
        date,
        amount: +amount,
        type,
      };
      if (shiftId) {
        payload.shiftId = shiftId;
        const shiftDate = shiftOptions.find((option) => option._id === shiftId);
        if (shiftDate) payload.date = shiftDate?.name;
      }
      if (income) {
        const updatedIncome: IIncome = {
          ...payload,
          _id: income._id,
        };
        await updateIncome(updatedIncome);
      } else {
        await addIncome(payload);
      }
      notify(
        income ? 'Income updated' : 'Income added',
        'success',
        'add-income-success'
      );
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
        clubIdIsValid && shiftIdIsValid && amountIsValid && typeIsValid
      );
    else
      setIsFormValid(
        clubIdIsValid && dateIsValid && amountIsValid && typeIsValid
      );
  }, [
    clubIdIsValid,
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
          <h3 className={formStyles.title}>
            {income ? 'Edit Income' : 'Add Income'}
          </h3>
          <Select
            name='club'
            defaultOptionName='Club'
            options={clubOptions}
            value={clubId}
            hasError={clubIdHasError}
            link='/clubs/club-form'
            linkText='Add Club'
            errorMessage='Club required'
            handleChange={clubIdChangeHandler}
            handleBlur={clubIdBlurHandler}
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
