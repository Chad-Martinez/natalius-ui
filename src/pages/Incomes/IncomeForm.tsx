import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import Input from '../../components/forms/Input';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import Select from '../../components/forms/Select';
import { useLoaderData } from 'react-router-dom';
import { notify } from '../../utils/toastify';
import { AxiosError } from 'axios';
import { GigName } from '../../types/Gig';
import useInput from '../../hooks/useInput';
import dayjs from 'dayjs';
import { addIncome } from '../../services/incomeServices';

const IncomeForm: FC = (): JSX.Element => {
  const [gigOptions, setGigOptions] = useState<GigName[] | undefined>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const loaderData = useLoaderData();
  const {
    value: gigId,
    isValid: gigIdIsValid,
    hasError: gigIdHasError,
    valueChangeHandler: gigIdChangeHandler,
    inputBlurHandler: gigIdBlurHandler,
    reset: resetGigId,
  } = useInput((v) => v !== '');
  1;
  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput((v) => dayjs(v).isValid(), dayjs().format('YYYY-MM-DD'));

  const {
    value: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandledr,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput((v) => v !== '');

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetType,
  } = useInput((v) => v !== '');

  useEffect(() => {
    if (loaderData instanceof AxiosError) {
      notify(loaderData.response?.data.message, 'error', 'gignames-error');
    } else {
      setGigOptions(loaderData as GigName[]);
    }
  }, [loaderData]);

  const handleReset = () => {
    resetGigId();
    resetDate();
    resetAmount();
    resetType();
  };
  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      await addIncome({ gigId, date, amount, type });
      notify('Income added', 'success', 'add-income-success');
    } catch (error) {
      console.error('Income Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'add-income-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  useEffect(() => {
    setIsFormValid(gigIdIsValid && dateIsValid && amountIsValid && typeIsValid);
  }, [gigIdIsValid, dateIsValid, amountIsValid, typeIsValid]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Income</h3>
          <Select
            name='gig'
            defaultOptionName='Gig'
            options={gigOptions}
            value={gigId}
            hasError={gigIdHasError}
            link='/gigs/form'
            linkText='Add Gig'
            errorMessage='Gig required'
            handleChange={gigIdChangeHandler}
            handleBlur={gigIdBlurHandler}
          />

          <Input
            name='date'
            type='date'
            value={date}
            hasError={dateHasError}
            errorMessage='Date required'
            handleChange={dateChangeHandler}
            handleBlur={dateBlurHandler}
          />
          <Input
            id='amount'
            name='amount'
            value={amount}
            hasError={amountHasError}
            placeholder='0.00'
            min='0.01'
            type='number'
            errorMessage='Amount must be greater than $0.01'
            handleChange={amountChangeHandledr}
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
        <Button text='Reset' onClick={handleReset} />
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

export default IncomeForm;
