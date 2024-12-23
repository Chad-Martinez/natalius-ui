import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import Input from '../../components/forms/Input';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import Button from '../../components/ui/Button/Button';
import Select from '../../components/forms/Select';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { notify } from '../../helpers/toast-helpers';
import { AxiosError } from 'axios';
import useInput from '../../hooks/useInput';
import dayjs from 'dayjs';
import { IExpense, IExpenseBase } from '../../interfaces/IExpense.interface';
import { addExpense, updateExpense } from '../../services/expensesService';
import TextArea from '../../components/forms/TextArea';
import {
  formatToAutoDecimal,
  digitGroupingFormatter,
} from '../../helpers/format-helpers';
import { IVendor } from '../../interfaces/IVendor.interface';

const ExpenseForm: FC = (): JSX.Element => {
  const location = useLocation();

  const newVendor: IVendor = location.state?.vendor;
  const [vendorOptions, setVendorOptions] = useState<IVendor[] | []>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  const expense: IExpense = location.state?.expense;

  const {
    value: vendorId,
    isValid: vendorIdIsValid,
    hasError: vendorIdHasError,
    valueChangeHandler: vendorIdChangeHandler,
    inputBlurHandler: vendorIdBlurHandler,
  } = useInput<string>(
    (v) => v !== '',
    expense ? expense.vendorId : newVendor ? newVendor._id : ''
  );

  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput<string>(
    (v) => dayjs(v).isValid(),
    expense
      ? dayjs.utc(expense.date).local().format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD')
  );

  const {
    value: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput<string>(
    (v) => +v.replace(',', '') > 0,
    expense ? expense.amount.toFixed(2) : '0'
  );

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
  } = useInput<string>(
    (v) => v !== '',
    expense?.type
      ? expense.type
      : newVendor && newVendor.useDefaults
      ? newVendor.defaultType
      : ''
  );

  const {
    value: milage,
    isValid: milageIsValid,
    hasError: milageHasError,
    valueChangeHandler: milageChangeHandler,
    inputBlurHandler: milageBlurHandler,
  } = useInput<string>(
    (v) => /^[0-9]+$/.test(v) || v === '',
    expense?.milage
      ? expense.milage.toString()
      : newVendor && newVendor.useDefaults
      ? newVendor.milage.toString()
      : '0'
  );

  const { value: notes, valueChangeHandler: notesChangeHandler } =
    useInput<string>((v) => v !== '', '');

  useEffect(() => {
    if (loaderData instanceof AxiosError) {
      notify(loaderData.response?.data.message, 'error', 'vendors-error');
    } else {
      setVendorOptions(loaderData as IVendor[]);
    }
  }, [loaderData]);

  const convertAmount = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = formatToAutoDecimal(event.target.value);
    event.target.value = value;
    amountChangeHandler(event);
  };

  const convertMilage = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = digitGroupingFormatter(event.target.value);
    event.target.value = value;
    milageChangeHandler(event);
  };

  const changeOfVendor = (event: ChangeEvent<HTMLSelectElement>) => {
    vendorIdChangeHandler(event);
    const filteredVendors: IVendor[] | undefined = vendorOptions?.filter(
      (vendor: IVendor) => vendor._id === event.target.value
    );
    const newVendor =
      filteredVendors && filteredVendors.length > 0 ? filteredVendors[0] : null;
    if (newVendor?.useDefaults) {
      if (newVendor.milage > 0) {
        const milageEvent = {
          ...event,
          target: {
            ...event.target,
            value: newVendor.milage.toString(),
          },
        };
        milageChangeHandler(milageEvent);
      }
      if (newVendor.defaultType) {
        const typeEvent = {
          ...event,
          target: {
            ...event.target,
            value: newVendor.defaultType,
          },
        };
        typeChangeHandler(typeEvent);
      }
    }
  };

  const handleCancel = (): void => navigate(-1);

  const handleSubmit = async (): Promise<void> => {
    setIsTransmitting(true);
    try {
      const payload: IExpenseBase = {
        vendorId,
        date: dayjs(date).utc().format('YYYY-MM-DDTHH:mm'),
        amount: +amount.replace(',', ''),
        milage: +milage,
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

  const handleLinkClick = (): void =>
    navigate('/vendors/vendor-form', {
      state: { from: '/expenses/expense-form' },
    });

  useEffect(() => {
    setIsFormValid(
      vendorIdIsValid &&
        dateIsValid &&
        amountIsValid &&
        typeIsValid &&
        milageIsValid
    );
  }, [vendorIdIsValid, dateIsValid, amountIsValid, typeIsValid, milageIsValid]);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>
            {expense ? 'Update' : 'Add'} Expense
          </h3>
          <Select
            name='vendor'
            defaultOptionName='Vendor'
            options={vendorOptions}
            value={vendorId}
            hasError={vendorIdHasError}
            autoFocus={true}
            linkText='Add Vendor'
            handleLinkClick={handleLinkClick}
            errorMessage='Vendor required'
            handleChange={changeOfVendor}
            handleBlur={vendorIdBlurHandler}
          />
          <Input
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
            value={`$${amount}`}
            hasError={amountHasError}
            placeholder='Enter expense amount'
            type='text'
            errorMessage='Amount must be greater than $0.01'
            handleChange={convertAmount}
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
          <Input
            name='milage'
            min={0}
            value={milage}
            placeholder='0'
            hasError={milageHasError}
            errorMessage='Amount must be zero or greater.'
            handleChange={convertMilage}
            handleBlur={milageBlurHandler}
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

export default ExpenseForm;
