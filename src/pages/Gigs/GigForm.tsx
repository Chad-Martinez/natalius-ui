import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button';
import Input from '../../components/forms/Input';
import useInput from '../../hooks/useInput';
import Select from '../../components/forms/Select';
import { US_STATES } from '../../utils/states';
import { addGig } from '../../services/gigsServices';
import { notify } from '../../utils/toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IGigBase } from '../../interfaces/IGig.interface';

const GigForm: FC = (): JSX.Element => {
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

  const { value: street, valueChangeHandler: streetChangeHandler } = useInput(
    (v) => v !== ''
  );

  const { value: city, valueChangeHandler: cityChangeHandler } = useInput(
    (v) => v !== ''
  );

  const { value: state, valueChangeHandler: stateChangeHandler } = useInput(
    (v) => v !== ''
  );

  const {
    value: zip,
    isValid: zipIsValid,
    hasError: zipHasError,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler,
  } = useInput((v) => v === '' || (!isNaN(+v) && v.length === 5));

  const { value: contactName, valueChangeHandler: contactNameChangeHandler } =
    useInput((v) => v !== '');

  const {
    value: contactPhone,
    isValid: contactPhoneIsValid,
    hasError: contactPhoneHasError,
    valueChangeHandler: contactPhoneChangeHandler,
    inputBlurHandler: contactPhoneBlurHandler,
  } = useInput((v) => v === '' || /\d{3}-\d{3}-\d{4}/.test(v));

  const {
    value: distance,
    isValid: distanceIsValid,
    hasError: distanceHasError,
    valueChangeHandler: distanceChangeHandler,
    inputBlurHandler: distanceBlurHandler,
  } = useInput((v) => +v >= 1 || v === '');

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      const address: IGigBase['address'] = {};
      if (street) address.street = street;
      if (city) address.city = city;
      if (state) address.state = state;
      if (zip) address.zip = +zip;

      const contact: IGigBase['contact'] = {};
      if (contactName) contact.name = contactName;
      if (contactPhone) contact.phone = contactPhone;

      const payload: IGigBase = {
        name,
        isArchived: false,
      };

      if (street || city || state || zip) payload.address = address;
      if (contactName || contactPhone) payload.contact = contact;
      if (distance) payload.distance = +distance;

      await addGig(payload);
      notify('Gig added', 'success', 'add-gig-success');
      navigate(-1);
    } catch (error) {
      console.error('Gig Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'add-gig-error');
    } finally {
      setIsTransmitting(false);
    }
  };

  useEffect(() => {
    setIsFormValid(
      nameIsValid && zipIsValid && contactPhoneIsValid && distanceIsValid
    );
  }, [nameIsValid, zipIsValid, contactPhoneIsValid, distanceIsValid]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Add a Gig</h3>
          <Input
            placeholder='Gig Name*'
            value={name}
            hasError={nameHasError}
            errorMessage='Gig name required'
            handleChange={nameChangeHandler}
            handleBlur={nameBlurHandler}
          />
          <Input
            placeholder='Street'
            value={street}
            handleChange={streetChangeHandler}
          />
          <Input
            placeholder='City'
            value={city}
            handleChange={cityChangeHandler}
          />
          <div className={formStyles.sideBySideInputs}>
            <Select
              options={US_STATES}
              name='state'
              defaultOptionName='State'
              value={state}
              handleChange={stateChangeHandler}
            />
            <Input
              placeholder='Zip Code'
              minLength={5}
              maxLength={5}
              value={zip}
              hasError={zipHasError}
              errorMessage='Must be blank or 5 digit zip code'
              handleChange={zipChangeHandler}
              handleBlur={zipBlurHandler}
            />
          </div>
          <Input
            placeholder='Contact Name'
            value={contactName}
            handleChange={contactNameChangeHandler}
          />
          <Input
            placeholder='Contact Phone'
            value={contactPhone}
            hasError={contactPhoneHasError}
            errorMessage='Ten digit phone format: XXX-XXX-XXXX'
            handleChange={contactPhoneChangeHandler}
            handleBlur={contactPhoneBlurHandler}
          />
          <Input
            placeholder='Distance - Round Trip Miles'
            type='number'
            min={1}
            step={1}
            value={distance}
            hasError={distanceHasError}
            errorMessage='Must be blank or at least 1 mile'
            handleChange={distanceChangeHandler}
            handleBlur={distanceBlurHandler}
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

export default GigForm;
