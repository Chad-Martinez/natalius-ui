import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import Input from '../../components/forms/Input';
import useInput from '../../hooks/useInput';
import Select from '../../components/forms/Select';
import { notify } from '../../utils/toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IVendorBase } from '../../interfaces/IVendor.interface';
import { addVendor } from '../../services/vendorsServices';
import TextArea from '../../components/forms/TextArea';

const VendorForm: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((v) => v !== '');

  const {
    value: defaultType,
    isValid: defaultTypeIsValid,
    hasError: defaultTypeHasError,
    valueChangeHandler: defaultTypeChangeHandler,
    inputBlurHandler: defaultTypeBlurHandler,
  } = useInput((v) => v !== '');

  const { value: distance, valueChangeHandler: distanceChangeHandler } =
    useInput((v) => +v >= 1 || v === '');

  const { value: notes, valueChangeHandler: notesChangeHandler } = useInput(
    (v) => v !== ''
  );

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      const payload: IVendorBase = {
        name,
        defaultType,
        notes,
      };
      if (distance) payload.distance = +distance;

      await addVendor(payload);
      notify('Vendor added', 'success', 'add-gig-success');

      navigate(-1);
    } catch (error) {
      console.error('Vendor Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'gig-form-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  useEffect(() => {
    setIsFormValid(nameIsValid && defaultTypeIsValid);
  }, [nameIsValid, defaultTypeIsValid]);

  return (
    <div className={styles.container}>
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
          <Select
            name='defaultType'
            defaultOptionName='Expense Type'
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
            placeholder='Distance - Round Trip Miles'
            type='number'
            min={1}
            step={1}
            value={distance}
            handleChange={distanceChangeHandler}
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
    </div>
  );
};

export default VendorForm;
