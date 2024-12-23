import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/forms/Input';
import useInput from '../../hooks/useInput';
import Select from '../../components/forms/Select';
import { notify } from '../../helpers/toast-helpers';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { IVendorBase } from '../../interfaces/IVendor.interface';
import { addVendor } from '../../services/vendorsServices';
import TextArea from '../../components/forms/TextArea';
import Switch from '../../components/ui/Switch/Switch';
import { digitGroupingFormatter } from '../../helpers/format-helpers';

const VendorForm: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput<string>((v) => v !== '', '');

  const { value: useDefaults, valueChangeHandler: useDefaultsChangeHandler } =
    useInput<boolean>((v) => v !== null, false);

  const {
    value: defaultType,
    isValid: defaultTypeIsValid,
    hasError: defaultTypeHasError,
    valueChangeHandler: defaultTypeChangeHandler,
    inputBlurHandler: defaultTypeBlurHandler,
  } = useInput<string>((v) => v !== null, '');

  const { value: milage, valueChangeHandler: milageChangeHandler } =
    useInput<string>((v) => +v >= 0, '');

  const { value: notes, valueChangeHandler: notesChangeHandler } =
    useInput<string>((v) => v !== '', '');

  const handleCancel = () => navigate(-1);

  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      const payload: IVendorBase = {
        name,
        defaultType,
        notes,
        milage: +milage,
        useDefaults,
      };

      const { data } = await addVendor(payload);
      notify('Vendor added', 'success', 'add-club-success');

      if (location.state?.from)
        navigate('/expenses/expense-form', {
          state: { vendor: data },
        });
      else navigate(-1);
    } catch (error) {
      console.error('Vendor Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'club-form-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  const convertAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = digitGroupingFormatter(+event.target.value).toString();
    event.target.value = value;
    milageChangeHandler(event);
  };

  useEffect(() => {
    setIsFormValid(nameIsValid && defaultTypeIsValid);
  }, [nameIsValid, defaultTypeIsValid]);

  return (
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add Vendor</h3>
          <Input
            placeholder='Vendor Name*'
            value={name}
            hasError={nameHasError}
            errorMessage='Vendor name required'
            handleChange={nameChangeHandler}
            handleBlur={nameBlurHandler}
          />
          <div
            style={{
              display: 'flex',
              alignContent: 'end',
              alignItems: 'center',
              justifyContent: 'right',
            }}
          >
            <span style={{ color: 'white', padding: '6px' }}>Use Defaults</span>
            <Switch
              isChecked={useDefaults}
              handleChange={useDefaultsChangeHandler}
            />
          </div>
          <Select
            name='defaultType'
            defaultOptionName='default expense type'
            options={[
              { _id: 'EQUIPMENT', name: 'EQUIPMENT' },
              { _id: 'SERVICE', name: 'SERVICE' },
              { _id: 'MISC', name: 'MISC' },
            ]}
            value={defaultType}
            hasError={defaultTypeHasError}
            errorMessage='Expense type required'
            handleChange={defaultTypeChangeHandler}
            handleBlur={defaultTypeBlurHandler}
          />
          <Input
            placeholder='Set default round trip miles'
            value={milage}
            handleChange={convertAmount}
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

export default VendorForm;
