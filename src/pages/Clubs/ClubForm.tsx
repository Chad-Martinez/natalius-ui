import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/dashboard/BottomNav';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/forms/Input';
import useInput from '../../hooks/useInput';
import Select from '../../components/forms/Select';
import { US_STATES } from '../../utils/states';
import { addClub, updateClub } from '../../services/clubsServices';
import { notify } from '../../utils/toastify';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { IClub, IClubBase } from '../../interfaces/IClub.interface';
import { validatePhone } from '../../utils/validators';

const ClubForm: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const club: IClub = location.state?.club;

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((v) => v !== '', club ? club.name : '');

  const { value: street, valueChangeHandler: streetChangeHandler } = useInput(
    (v) => v !== '',
    club ? club.address?.street : ''
  );

  const { value: city, valueChangeHandler: cityChangeHandler } = useInput(
    (v) => v !== '',
    club ? club.address?.city : ''
  );

  const { value: state, valueChangeHandler: stateChangeHandler } = useInput(
    (v) => v !== '',
    club ? club.address?.state : ''
  );

  const {
    value: zip,
    isValid: zipIsValid,
    hasError: zipHasError,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler,
  } = useInput(
    (v) => v === '' || (!isNaN(+v) && v.length === 5),
    club ? club.address?.zip?.toString() : ''
  );

  const { value: contactName, valueChangeHandler: contactNameChangeHandler } =
    useInput((v) => v !== '', club ? club.contact?.name : '');

  const {
    value: contactPhone,
    isValid: contactPhoneIsValid,
    hasError: contactPhoneHasError,
    valueChangeHandler: contactPhoneChangeHandler,
    inputBlurHandler: contactPhoneBlurHandler,
  } = useInput(
    (value) => value === '' || validatePhone(value),
    club ? club.contact?.phone : ''
  );

  const {
    value: distance,
    isValid: distanceIsValid,
    hasError: distanceHasError,
    valueChangeHandler: distanceChangeHandler,
    inputBlurHandler: distanceBlurHandler,
  } = useInput(
    (v) => +v >= 1 || v === '',
    club ? club.distance?.toString() : ''
  );

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = async () => {
    setIsTransmitting(true);
    try {
      const address: IClubBase['address'] = {};
      if (street) address.street = street;
      if (city) address.city = city;
      if (state) address.state = state;
      if (zip) address.zip = +zip;

      const contact: IClubBase['contact'] = {};
      if (contactName) contact.name = contactName;
      if (contactPhone) contact.phone = contactPhone;

      const payload: IClubBase = {
        name,
        isArchived: false,
      };

      if (street || city || state || zip) payload.address = address;
      if (contactName || contactPhone) payload.contact = contact;
      if (distance) payload.distance = +distance;

      if (club) {
        const updatedClub: IClub = {
          ...payload,
          _id: club._id,
        };
        await updateClub(updatedClub);
        notify('Club updated', 'success', 'update-club-sucess');
      } else {
        await addClub(payload);
        notify('Club added', 'success', 'add-club-success');
      }
      navigate(-1);
    } catch (error) {
      console.error('Club Form Error: ', error);
      if (error instanceof AxiosError)
        notify(error.response?.data.message, 'error', 'club-form-error');
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
    <>
      <div className={styles.mainContent}>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>{club ? 'Edit' : 'Add'} Club</h3>
          <Input
            placeholder='Club Name*'
            value={name}
            hasError={nameHasError}
            errorMessage='Club name required'
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
    </>
  );
};

export default ClubForm;
