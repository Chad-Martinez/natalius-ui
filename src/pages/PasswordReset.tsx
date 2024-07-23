import { FC, useCallback, useEffect, useState } from 'react';
import formStyles from '../components/forms/FormComponents.module.css';
import Input from '../components/forms/Input';
import useInput from '../hooks/useInput';
import Button from '../components/forms/SubmitButton';
import { AxiosError, AxiosResponse } from 'axios';
import { notify } from '../utils/toastify';
import Logo from '../components/ui/Logo/Logo';
import { validatePassword } from '../utils/validators';
import { resetPassword } from '../services/authServices';
import { useNavigate, useParams } from 'react-router-dom';

const PasswordReset: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandledr,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => validatePassword(value));

  const {
    value: pwConfirm,
    isValid: pwConfirmIsValid,
    hasError: pwConfirmHasError,
    valueChangeHandler: pwConfirmChangeHandledr,
    inputBlurHandler: pwConfirmBlurHandler,
  } = useInput((value) => password === value && value !== '');

  const handleSubmit = async () => {
    try {
      setIsTransmitting(true);
      if (!token) return;
      const { data } = (await resetPassword({
        token,
        password,
      })) as AxiosResponse;

      notify(data.message, 'success', 'password-reset-success');
      navigate('/login');
    } catch (error) {
      console.error('PasswordReset Error: ', error);
      if (error instanceof AxiosError) {
        const message = error?.response?.data.message;
        notify(message, 'error', 'password-reset-error');
      }
    } finally {
      setIsTransmitting(false);
    }
  };

  const checkFormValidity = useCallback(() => {
    return passwordIsValid && pwConfirmIsValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [passwordIsValid, pwConfirmIsValid]);

  useEffect(() => checkFormValidity(), [checkFormValidity]);

  return (
    <form className={formStyles.form}>
      <Logo addedStyles={{ width: '35%' }} />
      <h2>Password Reset</h2>
      <Input
        id='password'
        name='password'
        value={password}
        hasError={passwordHasError}
        placeholder='New Password'
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
        placeholder='Confirm New Password'
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

export default PasswordReset;
