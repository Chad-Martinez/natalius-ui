import { FC, useCallback, useEffect, useState } from 'react';
import Input from '../../components/forms/Input';
import useInput from '../../hooks/useInput';
import formStyles from '../../components/forms/FormComponents.module.css';
import { AxiosError, AxiosResponse } from 'axios';
import { notify } from '../../helpers/toast-helpers';
import SubmitButton from '../../components/ui/SubmitButton/SubmitButton';
import Logo from '../../components/ui/Logo/Logo';
import { passwordResetEmail } from '../../services/authServices';

export const ForgotPassword: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandledr,
    inputBlurHandler: emailBlurHandler,
  } = useInput<string>((value) => value !== '', '');

  const handleSubmit = async () => {
    try {
      setIsTransmitting(true);
      const { data } = (await passwordResetEmail({
        email,
      })) as AxiosResponse;
      notify(data.message, 'success', 'password-email-success');
    } catch (error) {
      console.error('Password Reset Email Error: ', error);
      if (error instanceof AxiosError) {
        const message = error?.response?.data.message;
        notify(message, 'error', 'password-email-error');
      }
    } finally {
      setIsTransmitting(false);
    }
  };

  const checkFormValidity = useCallback(() => {
    return emailIsValid ? setIsFormValid(true) : setIsFormValid(false);
  }, [emailIsValid]);

  useEffect(() => checkFormValidity(), [checkFormValidity]);

  return (
    <form className={formStyles.form}>
      <Logo
        addedStyles={{
          width: '35%',
          alignSelf: 'center',
          marginBottom: '15px',
        }}
      />
      <h2>Forgot Password?</h2>
      <p>Enter your email address to receive a link to reset your password.</p>
      <Input
        id='email'
        name='email'
        value={email}
        hasError={emailHasError}
        placeholder='Email'
        type='email'
        errorMessage='Email required'
        handleChange={emailChangeHandledr}
        handleBlur={emailBlurHandler}
      />
      <SubmitButton
        text='submit'
        handleClick={handleSubmit}
        enabled={isFormValid}
        loading={isTransmitting}
      />
    </form>
  );
};

export default ForgotPassword;
