import { FC, useCallback, useEffect, useState } from 'react';
import formStyles from '../components/forms/FormComponents.module.css';
import Input from '../components/forms/Input';
import useInput from '../hooks/useInput';
import Button from '../components/forms/SubmitButton';
import { register } from '../services/authServices';
import { AxiosError, AxiosResponse } from 'axios';
import { notify } from '../utils/toastify';
import Logo from '../components/ui/Logo/Logo';

const Register: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandledr,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandledr,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandledr,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  );

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandledr,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
      value
    )
  );

  const {
    value: pwConfirm,
    isValid: pwConfirmIsValid,
    hasError: pwConfirmHasError,
    valueChangeHandler: pwConfirmChangeHandledr,
    inputBlurHandler: pwConfirmBlurHandler,
    reset: pwConfirmReset,
  } = useInput((value) => password === value && value !== '');

  const formReset = (): void => {
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
    pwConfirmReset();
  };

  const handleSubmit = async () => {
    try {
      setIsTransmitting(true);
      const { data } = (await register({
        firstName,
        lastName,
        email,
        password,
      })) as AxiosResponse;

      notify(data.message, 'success', 'register-success');
      formReset();
    } catch (error) {
      console.error('Register Error: ', error);
      if (error instanceof AxiosError) {
        const message = error?.response?.data.message;
        notify(message, 'error', 'register-error');
      }
    } finally {
      setIsTransmitting(false);
    }
  };

  const checkFormValidity = useCallback(() => {
    return firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      pwConfirmIsValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [
    firstNameIsValid,
    lastNameIsValid,
    emailIsValid,
    passwordIsValid,
    pwConfirmIsValid,
  ]);

  useEffect(() => checkFormValidity(), [checkFormValidity]);

  return (
    <form className={formStyles.form}>
      <Logo addedStyles={{ width: '35%' }} />
      <h2>register</h2>
      <Input
        id='firstName'
        name='firstName'
        value={firstName}
        hasError={firstNameHasError}
        placeholder='First Name'
        type='text'
        errorMessage='First name required'
        handleChange={firstNameChangeHandledr}
        handleBlur={firstNameBlurHandler}
      />
      <Input
        id='lastName'
        name='lastName'
        value={lastName}
        hasError={lastNameHasError}
        placeholder='Last Name'
        type='text'
        errorMessage='Last name required'
        handleChange={lastNameChangeHandledr}
        handleBlur={lastNameBlurHandler}
      />
      <Input
        id='email'
        name='email'
        value={email}
        hasError={emailHasError}
        placeholder='Email'
        type='email'
        errorMessage='Email is not valid'
        handleChange={emailChangeHandledr}
        handleBlur={emailBlurHandler}
      />
      <Input
        id='password'
        name='password'
        value={password}
        hasError={passwordHasError}
        placeholder='Password'
        type='password'
        errorMessage='Minimum 8 characters with one number & special character'
        handleChange={passwordChangeHandledr}
        handleBlur={passwordBlurHandler}
      />
      <Input
        id='pwConfirm'
        name='pwConfirm'
        value={pwConfirm}
        hasError={pwConfirmHasError}
        placeholder='Confirm Password'
        type='password'
        errorMessage='Passwords must match'
        handleChange={pwConfirmChangeHandledr}
        handleBlur={pwConfirmBlurHandler}
      />
      <Button
        text='submit'
        handleClick={handleSubmit}
        enabled={isFormValid}
        loading={isTransmitting}
      />
    </form>
  );
};

export default Register;
