import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
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
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import {
  getUserTimezone,
  TIMEZONE_SELECT,
} from '../../helpers/date-time-helpers';
import Switch from '../../components/ui/Switch/Switch';

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
  } = useInput<string>((v) => v !== '', club?.name || '');

  const { value: street, valueChangeHandler: streetChangeHandler } =
    useInput<string>((v) => v !== '', club?.address?.street || '');

  const { value: city, valueChangeHandler: cityChangeHandler } =
    useInput<string>((v) => v !== '', club?.address?.city || '');

  const { value: state, valueChangeHandler: stateChangeHandler } =
    useInput<string>((v) => v !== '', club?.address?.state || '');

  const {
    value: zip,
    isValid: zipIsValid,
    hasError: zipHasError,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler,
  } = useInput<string>(
    (v) => v === '' || /^\d{5}$/.test(v),
    club?.address?.zip?.toString() || ''
  );

  const { value: contactName, valueChangeHandler: contactNameChangeHandler } =
    useInput<string>((v) => v !== '', club?.contact?.name || '');

  const {
    value: contactPhone,
    isValid: contactPhoneIsValid,
    hasError: contactPhoneHasError,
    valueChangeHandler: contactPhoneChangeHandler,
    inputBlurHandler: contactPhoneBlurHandler,
  } = useInput<string>(
    (value) => value === '' || validatePhone(value),
    club?.contact?.phone || ''
  );

  const { value: useDefaults, valueChangeHandler: useDefaultsChangeHandler } =
    useInput<boolean>((v) => v !== null, club?.defaults?.useDefaults || false);

  const {
    value: floorFee,
    isValid: floorFeeIsValid,
    hasError: floorFeeHasError,
    valueChangeHandler: floorFeeChangeHandler,
    inputBlurHandler: floorFeeBlurHandler,
  } = useInput<string>(
    (v) => /^[0-9]+$/.test(v) || v === '',
    club?.defaults?.floorFee?.toString() || ''
  );

  const {
    value: pricePerDance,
    isValid: pricePerDanceIsValid,
    hasError: pricePerDanceHasError,
    valueChangeHandler: pricePerDanceChangeHandler,
    inputBlurHandler: pricePerDanceBlurHandler,
  } = useInput<string>(
    (v) => /^[0-9]+$/.test(v) || v === '',
    club?.defaults?.pricePerDance?.toString() || ''
  );

  const {
    value: tips,
    isValid: tipsIsValid,
    hasError: tipsHasError,
    valueChangeHandler: tipsChangeHandler,
    inputBlurHandler: tipsBlurHandler,
  } = useInput<string>(
    (v) => /^[0-9]+$/.test(v) || v === '',
    club?.defaults?.tips?.toString() || ''
  );

  const {
    value: other,
    isValid: otherIsValid,
    hasError: otherHasError,
    valueChangeHandler: otherChangeHandler,
    inputBlurHandler: otherBlurHandler,
  } = useInput<string>(
    (v) => /^[0-9]+$/.test(v) || v === '',
    club?.defaults?.other?.toString() || ''
  );

  const {
    value: distance,
    isValid: distanceIsValid,
    hasError: distanceHasError,
    valueChangeHandler: distanceChangeHandler,
    inputBlurHandler: distanceBlurHandler,
  } = useInput<string>(
    (v) => /^[0-9]+$/.test(v) || v === '',
    club?.defaults?.distance?.toString() || ''
  );

  const {
    value: timezone,
    valueChangeHandler: timezoneChangeHandler,
    inputBlurHandler: timezoneBlurHandler,
  } = useInput<string>(
    (v) => v === '',
    club?.defaults?.timezone?.toString() || getUserTimezone()
  );

  const handleCancel = (): void => navigate(-1);

  const handleSubmit = async (): Promise<void> => {
    setIsTransmitting(true);
    try {
      const address: IClubBase['address'] = {
        street: street ? street : null,
        city: city ? city : null,
        state: state ? state : null,
        zip: zip ? +zip : null,
      };

      const contact: IClubBase['contact'] = {
        name: contactName ? contactName : null,
        phone: contactPhone ? contactPhone : null,
      };

      const defaults: IClubBase['defaults'] = {
        useDefaults: useDefaults,
        floorFee: floorFee ? +floorFee : 0,
        pricePerDance: pricePerDance ? +pricePerDance : 0,
        tips: tips ? +tips : 0,
        other: other ? +other : 0,
        distance: distance ? +distance : 0,
        timezone: timezone ? timezone : getUserTimezone(),
      };

      const payload: IClubBase = {
        name,
        address,
        contact,
        defaults,
        isArchived: false,
      };
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
      nameIsValid &&
        zipIsValid &&
        contactPhoneIsValid &&
        floorFeeIsValid &&
        pricePerDanceIsValid &&
        tipsIsValid &&
        otherIsValid &&
        distanceIsValid
    );
  }, [
    nameIsValid,
    zipIsValid,
    contactPhoneIsValid,
    floorFeeIsValid,
    pricePerDanceIsValid,
    tipsIsValid,
    otherIsValid,
    distanceIsValid,
  ]);

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
          {/* <Input
            placeholder='Distance - Round Trip Miles'
            type='number'
            min={1}
            step={1}
            value={distance}
            hasError={distanceHasError}
            errorMessage='Must be blank or at least 1 mile'
            handleChange={distanceChangeHandler}
            handleBlur={distanceBlurHandler}
          /> */}
        </form>
        <form className={formStyles.form}>
          <h3 className={formStyles.title}>Club Defaults (Optional)</h3>
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
          <div className={formStyles.sideBySideInputs}>
            <FormGroup>
              <Label name='floorFee' text='Floor Fee' />
              <Input
                name='floorFee'
                type='number'
                min={0}
                step={1}
                autoFocus={true}
                value={floorFee}
                placeholder='0'
                hasError={floorFeeHasError}
                errorMessage='Zero or greater - No decimals'
                handleChange={floorFeeChangeHandler}
                handleBlur={floorFeeBlurHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label name='pricePerDance' text='Fee Per Private Dance' />
              <Input
                name='pricePerDance'
                type='number'
                min={0}
                step={1}
                placeholder='0'
                value={pricePerDance}
                hasError={pricePerDanceHasError}
                errorMessage='Zero or greater - No decimals'
                handleChange={pricePerDanceChangeHandler}
                handleBlur={pricePerDanceBlurHandler}
              />
            </FormGroup>
          </div>
          <div className={formStyles.sideBySideInputs}>
            <FormGroup>
              <Label name='tips' text='Tips' />
              <Input
                name='tips'
                type='number'
                min={0}
                step={1}
                placeholder='0'
                value={tips}
                hasError={tipsHasError}
                errorMessage='Zero or greater - No decimals'
                handleChange={tipsChangeHandler}
                handleBlur={tipsBlurHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label name='other' text='Other Expenses' />
              <Input
                name='other'
                value={other}
                placeholder='0'
                min={0}
                step={1}
                type='number'
                hasError={otherHasError}
                errorMessage='Zero or greater - No decimals'
                handleChange={otherChangeHandler}
                handleBlur={otherBlurHandler}
              />
            </FormGroup>
          </div>
          <div className={formStyles.sideBySideInputs}>
            <FormGroup>
              <Label name='distance' text='Roundtrip Milage' />
              <Input
                placeholder='0'
                type='number'
                min={0}
                step={1}
                value={distance}
                hasError={distanceHasError}
                errorMessage='Zero or greater - No decimals'
                handleChange={distanceChangeHandler}
                handleBlur={distanceBlurHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label name='timezone' text='Club Timezone' />
              <Select
                name='timezone'
                defaultOptionName={'Timezone'}
                options={TIMEZONE_SELECT}
                value={timezone}
                handleBlur={timezoneBlurHandler}
                handleChange={timezoneChangeHandler}
              />
            </FormGroup>
          </div>
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
