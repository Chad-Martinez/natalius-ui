import { FC, useEffect, useState } from 'react';
import styles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/forms/Input';
import useInput from '../../hooks/useInput';
import Select from '../../components/forms/Select';
import { US_STATES } from '../../helpers/state-helpers';
import { addClub, updateClub } from '../../services/clubsServices';
import { notify } from '../../helpers/toast-helpers';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { IClub, IClubBase } from '../../interfaces/IClub.interface';
import { validatePhone } from '../../helpers/validator-helpers';
import FormGroup from '../../components/forms/FormGroup';
import Label from '../../components/forms/Label';
import {
  getUserTimezone,
  TIMEZONE_SELECT,
} from '../../helpers/date-time-helpers';
import Switch from '../../components/ui/Switch/Switch';
import {
  capitalizeFormatter,
  digitGroupingFormatter,
  phoneNumberFormatter,
  sanitizeStrToNum,
  sanitizeZipCode,
} from '../../helpers/format-helpers';

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
    (v) => v === '' || v.length === 5, // /^\d{5}$/.test(v),
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
    (v) => (v ? validatePhone(v) : v === ''),
    club?.contact?.phone || ''
  );

  const { value: useDefaults, valueChangeHandler: useDefaultsChangeHandler } =
    useInput<boolean>((v) => v !== null, club?.defaults?.useDefaults || false);

  const { value: floorFee, valueChangeHandler: floorFeeChangeHandler } =
    useInput<string>(
      (v) => v !== '',
      club?.defaults?.floorFee?.toString() || ''
    );

  const {
    value: pricePerDance,
    valueChangeHandler: pricePerDanceChangeHandler,
  } = useInput<string>(
    (v) => v !== '',
    club?.defaults?.pricePerDance?.toString() || ''
  );

  const { value: tips, valueChangeHandler: tipsChangeHandler } =
    useInput<string>((v) => v !== '', club?.defaults?.tips?.toString() || '');

  const { value: other, valueChangeHandler: otherChangeHandler } =
    useInput<string>((v) => v !== '', club?.defaults?.other?.toString() || '');

  const { value: milage, valueChangeHandler: milageChangeHandler } =
    useInput<string>(
      (v) => sanitizeStrToNum(v) >= 0,
      club?.defaults?.milage?.toString() || ''
    );

  const { value: timezone, valueChangeHandler: timezoneChangeHandler } =
    useInput<string>(
      (v) => v !== '',
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
        milage: milage ? +milage : 0,
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
    setIsFormValid(nameIsValid && zipIsValid && contactPhoneIsValid);
  }, [nameIsValid, zipIsValid, contactPhoneIsValid]);

  const convertAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = sanitizeStrToNum(event.target.value).toString();
    event.target.value = value;
    const inputName = event.target.name;
    switch (inputName) {
      case 'floorFee':
        floorFeeChangeHandler(event);
        break;
      case 'pricePerDance':
        pricePerDanceChangeHandler(event);
        break;
      case 'tips':
        tipsChangeHandler(event);
        break;
      case 'other':
        otherChangeHandler(event);
        break;
      case 'milage':
        milageChangeHandler(event);
        break;
      default:
        break;
    }
  };

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
            handleChange={(event) =>
              nameChangeHandler(capitalizeFormatter(event))
            }
            handleBlur={nameBlurHandler}
          />
          <Input
            placeholder='Street'
            value={street}
            handleChange={(event) =>
              streetChangeHandler(capitalizeFormatter(event))
            }
          />
          <Input
            placeholder='City'
            value={city}
            handleChange={(event) =>
              cityChangeHandler(capitalizeFormatter(event))
            }
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
              handleChange={(event) => zipChangeHandler(sanitizeZipCode(event))}
              handleBlur={zipBlurHandler}
            />
          </div>
          <Input
            placeholder='Contact Name'
            value={contactName}
            handleChange={(event) =>
              contactNameChangeHandler(capitalizeFormatter(event))
            }
          />
          <Input
            placeholder='Contact Phone'
            value={contactPhone}
            hasError={contactPhoneHasError}
            errorMessage='Ten digit phone format: XXX-XXX-XXXX'
            handleChange={(event) =>
              contactPhoneChangeHandler(phoneNumberFormatter(event))
            }
            handleBlur={contactPhoneBlurHandler}
          />
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
                value={`$${digitGroupingFormatter(floorFee)}`}
                placeholder='Floor Fee'
                handleChange={convertAmount}
              />
            </FormGroup>
            <FormGroup>
              <Label name='pricePerDance' text='Fee Per Private Dance' />
              <Input
                name='pricePerDance'
                placeholder='$ per Pvt'
                value={`$${digitGroupingFormatter(pricePerDance)}`}
                handleChange={convertAmount}
              />
            </FormGroup>
          </div>
          <div className={formStyles.sideBySideInputs}>
            <FormGroup>
              <Label name='tips' text='Tips' />
              <Input
                name='tips'
                placeholder='Tips'
                value={`$${digitGroupingFormatter(tips)}`}
                handleChange={convertAmount}
              />
            </FormGroup>
            <FormGroup>
              <Label name='other' text='Other Expenses' />
              <Input
                name='other'
                value={`$${digitGroupingFormatter(other)}`}
                placeholder='Other Expenses'
                handleChange={convertAmount}
              />
            </FormGroup>
          </div>
          <div className={formStyles.sideBySideInputs}>
            <FormGroup>
              <Label name='milage' text='Roundtrip Milage' />
              <Input
                name='milage'
                value={digitGroupingFormatter(milage)}
                placeholder='0'
                handleChange={convertAmount}
              />
            </FormGroup>
            <FormGroup>
              <Label name='timezone' text='Club Timezone' />
              <Select
                name='timezone'
                defaultOptionName={'Timezone'}
                options={TIMEZONE_SELECT}
                value={timezone}
                handleChange={timezoneChangeHandler}
              />
            </FormGroup>
          </div>
        </form>
      </div>
      <BottomNav>
        <Button
          text='Cancel'
          btnStyle='primaryOutlined'
          onClick={handleCancel}
        />
        <Button
          text={club ? 'Update' : 'Submit'}
          onClick={handleSubmit}
          btnStyle='primarySolid'
          enabled={isFormValid}
          loading={isTransmitting}
        />
      </BottomNav>
    </>
  );
};

export default ClubForm;
