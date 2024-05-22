import { FC, useCallback, useEffect, useState } from 'react';
import logo from '../assets/shell.png';
import formStyles from '../styles/FormComponents.module.css';
import Input from '../components/forms/Input';
import useInput from '../hooks/useInput';
import Button from '../components/forms/Button';

const Register: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, pwConfirm);

    formReset();
  };

  const checkFormValidity = useCallback(() => {
    console.log(
      'form is valid ',
      firstNameIsValid &&
        lastNameIsValid &&
        emailIsValid &&
        passwordIsValid &&
        pwConfirmIsValid
    );
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
    <div className={formStyles.formContainer}>
      <form className={formStyles.form}>
        <img className={formStyles.formLogo} src={logo} alt='' />
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
        />
      </form>
    </div>
  );
};

export default Register;
