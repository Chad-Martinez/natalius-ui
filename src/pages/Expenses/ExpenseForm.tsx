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
import { IExpense, IExpenseBase } from '../../interfaces/IExpense.interface';
import { addExpense, updateExpense } from '../../services/expensesService';
import { SelectOptions } from '../../types/SelectOptions';
import TextArea from '../../components/forms/TextArea';

const ExpenseForm: FC = (): JSX.Element => {
  const [vendorOptions, setVendorOptions] = useState<SelectOptions[] | []>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const expense: IExpense = location.state?.expense;
  const vendor: { vendorId: string; defaultType: string } =
    location.state?.vendor;

  const {
    value: vendorId,
    isValid: vendorIdIsValid,
    hasError: vendorIdHasError,
    valueChangeHandler: vendorIdChangeHandler,
    inputBlurHandler: vendorIdBlurHandler,
  } = useInput(
    (v) => v !== '',
    vendor ? vendor.vendorId : expense ? expense.vendorId : ''
  );

  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput(
    (v) => dayjs(v).isValid(),
    expense
      ? dayjs(expense.date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD')
  );

  const {
    value: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput((v) => v !== '', expense ? expense.amount.toString() : '');

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
  } = useInput(
    (v) => v !== '',
    vendor ? vendor.defaultType : expense ? expense.type : ''
  );

  const { value: notes, valueChangeHandler: notesChangeHandler } = useInput(
    (v) => v !== ''
  );

  useEffect(() => {
    if (loaderData instanceof AxiosError) {
      notify(loaderData.response?.data.message, 'error', 'vendors-error');
    } else {
      setVendorOptions(loaderData as SelectOptions[]);
    }
  }, [loaderData]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      const payload: IExpenseBase = {
        vendorId,
        date,
        amount: +amount,
        type,
        notes,
      };

      if (expense) {
        const updatedExpense: IExpense = {
          ...payload,
          _id: expense._id,
        };
        await updateExpense(updatedExpense);
      } else {
        await addExpense(payload);
      }
      notify(
        expense ? 'Expense updated' : 'Expense added',
        'success',
        'add-expense-success'
      );
      navigate(-1);
    } catch (error) {
      console.error('Expense Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'add-expense-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleLinkClick = () => {
    navigate('/vendors/vendor-form', {
      state: { from: '/expenses/expense-form' },
    });
  };

  useEffect(() => {
    setIsFormValid(
      vendorIdIsValid && dateIsValid && amountIsValid && typeIsValid
    );
  }, [vendorIdIsValid, dateIsValid, amountIsValid, typeIsValid]);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Expense</h3>
          <Select
            name='vendor'
            defaultOptionName='Vendor'
            options={vendorOptions}
            value={vendorId}
            hasError={vendorIdHasError}
            linkText='Add Vendor'
            handleLinkClick={handleLinkClick}
            errorMessage='Vendor required'
            handleChange={vendorIdChangeHandler}
            handleBlur={vendorIdBlurHandler}
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
            placeholder='Enter expense amount'
            min={0.01}
            type='number'
            errorMessage='Amount must be greater than $0.01'
            handleChange={amountChangeHandler}
            handleBlur={amountBlurHandler}
          />
          <Select
            name='type'
            defaultOptionName='Expense Type'
            options={[
              { _id: 'SERVICE', name: 'SERVICE' },
              { _id: 'EQUIPMENT', name: 'EQUIPMENT' },
              { _id: 'MISC', name: 'MISC' },
            ]}
            value={type}
            hasError={typeHasError}
            errorMessage='Expense type required'
            handleChange={typeChangeHandler}
            handleBlur={typeBlurHandler}
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

export default ExpenseForm;
