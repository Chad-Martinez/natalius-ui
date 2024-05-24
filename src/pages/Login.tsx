import { FC, useCallback, useContext, useEffect, useState } from 'react';
import Nav from '../components/ui/Nav';
import Input from '../components/forms/Input';
import useInput from '../hooks/useInput';
import formStyles from '../components/forms/FormComponents.module.css';
import { login } from '../services/authServices';
import { AxiosError, AxiosResponse } from 'axios';
import { notify } from '../utils/toastify';
import Button from '../components/forms/SubmitButton';
import Logo from '../components/ui/Logo';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: FC = (): JSX.Element => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandledr,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value !== '');

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandledr,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value !== '');

  const handleSubmit = async () => {
    try {
      setIsTransmitting(true);
      const { data } = (await login({
        email,
        password,
      })) as AxiosResponse;

      const { accessToken } = data;
      sessionStorage.setItem('at', accessToken);
      setIsAuth(true);
      navigate('/account');
    } catch (error) {
      console.error('Login Error: ', error);
      if (error instanceof AxiosError) {
        const message = error?.response?.data.message;
        notify(message, 'error', 'login-error');
      }
    } finally {
      setIsTransmitting(false);
    }
  };

  const checkFormValidity = useCallback(() => {
    return emailIsValid && passwordIsValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [emailIsValid, passwordIsValid]);

  useEffect(() => checkFormValidity(), [checkFormValidity]);

  return (
    <>
      <Nav />
      <div className={formStyles.formContainer}>
        <form className={formStyles.form}>
          <Logo addedStyles={{ width: '35%' }} />
          <h2>login</h2>
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
          <Input
            id='password'
            name='password'
            value={password}
            hasError={passwordHasError}
            placeholder='Password'
            type='password'
            errorMessage='Password Required'
            handleChange={passwordChangeHandledr}
            handleBlur={passwordBlurHandler}
          />
          <Button
            text='submit'
            handleClick={handleSubmit}
            enabled={isFormValid}
            loading={isTransmitting}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
