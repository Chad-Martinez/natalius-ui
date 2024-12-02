import { FC, useEffect, useState } from 'react';
import styles from '../../pages/PageWrapper.module.css';
import formStyles from '../forms/FormComponents.module.css';
import Input from '../forms/Input';
import BottomNav from '../ui/BottomNav/BottomNav';
import Button from '../ui/Button/Button';
import Select from '../forms/Select';
import useInput from '../../hooks/useInput';
import dayjs from 'dayjs';
import { IShift } from '../../interfaces/IShift.interface';
import FormGroup from '../forms/FormGroup';
import Label from '../forms/Label';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  moneyFormatter,
  moneyStrToNumFormatter,
} from '../../helpers/format-helpers';

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
  } = useInput<string>(
    (v) => +v >= 1 && /^\$?[0-9]+$/.test(v),
    shiftData?.income?.amount.toString() || '0'
  );

  const { value: type, valueChangeHandler: typeChangeHandler } =
    useInput<string>((v) => v !== '', shiftData?.income?.type || 'CASH');

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

  const convertAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = moneyStrToNumFormatter(event.target.value).toString();
    event.target.value = value;
    amountChangeHandler(event);
  };

  const handleNext = (): void => goNext(updatedShift);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>
            {shiftData?.shiftComplete ? 'Update' : 'Add'} Shift Income
          </h3>
          <FormGroup>
            <Label name='date' text='Shift Date' />
            <Input
              name='date'
              type='text'
              value={dayjs
                .utc(shiftData?.start)
                .tz(shiftData?.timezone)
                .format('dddd: MMMM D, YYYY')}
              disabled={true}
            />
          </FormGroup>
          <FormGroup>
            <Label name='amount' text='Amount' />
            <Input
              id='amount'
              name='amount'
              autoFocus={true}
              value={`$${moneyFormatter(+amount)}`}
              hasError={amountHasError}
              placeholder='Enter earnings'
              type='text'
              errorMessage='Amount must be $1 or greater'
              handleChange={convertAmount}
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
          btnStyle='primaryOutlined'
          text={location.state?.goToPage ? 'Cancel' : 'Prev'}
          onClick={location.state?.goToPage ? handleCancel : handlePrev}
        />
        <Button
          btnStyle='primarySolid'
          enabled={isFormValid}
          text={location.state?.goToPage ? 'Update' : 'Next'}
          onClick={location.state?.goToPage ? handleUpdate : handleNext}
        />
      </BottomNav>
    </>
  );
};

export default ShiftIncome;
