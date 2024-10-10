import { FC, useEffect, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import Input from '../forms/Input';
import BottomNav from '../dashboard/BottomNav';
import Button from '../ui/Button/Button';
import Select from '../forms/Select';
import useInput from '../../hooks/useInput';
import dayjs from 'dayjs';
import { IShift } from '../../interfaces/IShift.interface';
import FormGroup from '../forms/FormGroup';
import Label from '../forms/Label';
import { useLocation, useNavigate } from 'react-router-dom';

const ShiftIncome: FC<{
  goNext: (shift: IShift | null) => void;
  goBack: (shift: IShift | null) => void;
  onFinish: (shift: IShift) => void;
  shiftData: IShift | null;
}> = ({ goNext, goBack, onFinish, shiftData }): JSX.Element => {
  const [updatedShift, setUpdatedShift] = useState<IShift | null>(shiftData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    value: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput((v) => +v >= 0.01, shiftData?.income?.amount.toString() || '0');

  const { value: type, valueChangeHandler: typeChangeHandler } = useInput(
    (v) => v !== '',
    shiftData?.income?.type || 'CASH'
  );

  useEffect(() => {
    setUpdatedShift((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        income: {
          amount: +amount,
          type,
        },
      };
    });
  }, [amount, type]);

  useEffect(() => {
    setIsFormValid(amountIsValid);
  }, [amountIsValid]);

  const handleCancel = (): void => navigate(-1);

  const handlePrev = (): void => goBack(updatedShift);

  const handleUpdate = (): void => {
    if (!updatedShift) return;
    onFinish(updatedShift);
  };

  const handleNext = (): void => goNext(updatedShift);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>
            {location.state?.goToPage ? 'Update' : 'Add'} Shift Income
          </h3>
          <FormGroup>
            <Label name='date' text='Shift Date' />
            <Input
              name='date'
              type='text'
              value={dayjs(shiftData?.start).format('dddd: MMMM D, YYYY')}
              disabled={true}
            />
          </FormGroup>
          <FormGroup>
            <Label name='amount' text='Amount' />
            <Input
              id='amount'
              name='amount'
              autoFocus={true}
              value={amount}
              hasError={amountHasError}
              placeholder='Enter earnings'
              min={0.01}
              type='number'
              errorMessage='Amount must be greater than $0.01'
              handleChange={amountChangeHandler}
              handleBlur={amountBlurHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label name='type' text='Payment Type' />
            <Select
              name='type'
              options={[
                { _id: 'CASH', name: 'CASH' },
                { _id: 'CREDIT', name: 'CREDIT' },
                { _id: 'CHECK', name: 'CHECK' },
              ]}
              value={type}
              handleChange={typeChangeHandler}
            />
          </FormGroup>
        </form>
      </div>
      <BottomNav>
        <Button
          text={location.state?.goToPage ? 'Cancel' : 'Prev'}
          onClick={location.state?.goToPage ? handleCancel : handlePrev}
        />
        <Button
          text={location.state?.goToPage ? 'Update' : 'Next'}
          solid={true}
          disabled={!isFormValid}
          onClick={location.state?.goToPage ? handleUpdate : handleNext}
        />
      </BottomNav>
    </>
  );
};

export default ShiftIncome;
