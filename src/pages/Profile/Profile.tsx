import { FC, useCallback, useEffect, useState } from 'react';
import styles from './Profile.module.css';
import pageStyles from '../PageWrapper.module.css';
import formStyles from '../../components/forms/FormComponents.module.css';
import BottomNav from '../../components/ui/BottomNav/BottomNav';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/forms/Input';
import useInput from '../../hooks/useInput';
import { useLoaderData } from 'react-router-dom';
import { updatePassword, updateUserInfo } from '../../services/profileServices';
import { notify } from '../../helpers/toast-helpers';
import { AxiosError } from 'axios';
import {
  validateEmail,
  validatePassword,
} from '../../helpers/validator-helpers';

const Profile: FC = (): JSX.Element => {
  const [isProfileFormValid, setIsProfileFormValid] = useState<boolean>(false);
  const [isPasswordFormValid, setIsPasswordFormValid] =
    useState<boolean>(false);
  const [isProfileTransmitting, setIsProfileTransmitting] =
    useState<boolean>(false);
  const [isPasswordTransmitting, setIsPasswordTransmitting] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const profileLoaderData = useLoaderData() as {
    user: { stageName: string; email: string };
  };
  const user = profileLoaderData?.user;

  const {
    value: stageName,
    isValid: stageNameIsValid,
    hasError: stageNameHasError,
    valueChangeHandler: stageNameChangeHandledr,
    inputBlurHandler: stageNameBlurHandler,
  } = useInput<string>((value) => value.trim() !== '', user?.stageName || '');

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandledr,
    inputBlurHandler: emailBlurHandler,
  } = useInput<string>((value) => validateEmail(value), user?.email || '');

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandledr,
    inputBlurHandler: passwordBlurHandler,
  } = useInput<string>((value) => validatePassword(value), '');

  const {
    value: pwConfirm,
    isValid: pwConfirmIsValid,
    hasError: pwConfirmHasError,
    valueChangeHandler: pwConfirmChangeHandledr,
    inputBlurHandler: pwConfirmBlurHandler,
  } = useInput<string>((value) => password === value && value !== '', '');

  const handleUpdateProfile = async () => {
    try {
      setIsProfileTransmitting(true);
      const { data } = await updateUserInfo({ stageName, email });
      notify(data.message, 'success', 'update-profile-success');
    } catch (error) {
      console.error('Update Profile Error: ', error);
      if (error instanceof AxiosError) {
        const message = error?.response?.data.message;
        notify(message, 'error', 'update-profile-error');
      }
    } finally {
      setIsProfileTransmitting(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setIsPasswordTransmitting(true);
      const { data } = await updatePassword({ pw: password });
      notify(data.message, 'success', 'update-pw-success');
    } catch (error) {
      console.error('Update Password Error: ', error);
      if (error instanceof AxiosError) {
        const message = error?.response?.data.message;
        notify(message, 'error', 'update-pw-error');
      }
    } finally {
      setIsPasswordTransmitting(false);
    }
  };

  const checkProfileFormValidity = useCallback(() => {
    return stageNameIsValid && emailIsValid
      ? setIsProfileFormValid(true)
      : setIsProfileFormValid(false);
  }, [stageNameIsValid, emailIsValid]);

  const checkPasswordFormValidity = useCallback(() => {
    return passwordIsValid && pwConfirmIsValid
      ? setIsPasswordFormValid(true)
      : setIsPasswordFormValid(false);
  }, [passwordIsValid, pwConfirmIsValid]);

  useEffect(() => checkProfileFormValidity(), [checkProfileFormValidity]);

  useEffect(() => checkPasswordFormValidity(), [checkPasswordFormValidity]);

  const handleCancel = () => navigate(-1);

  return (
    <>
      <div className={pageStyles.mainContent}>
        <div className={styles.profileContainer}>
          <form className={formStyles.form}>
            <Input
              id='stageName'
              name='stageName'
              value={stageName}
              hasError={stageNameHasError}
              placeholder='Stage Name'
              type='text'
              errorMessage='Stage name required'
              handleChange={stageNameChangeHandledr}
              handleBlur={stageNameBlurHandler}
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
            <Button
              text='Update Profile'
              btnStyle='primarySolid'
              onClick={handleUpdateProfile}
              enabled={isProfileFormValid}
              loading={isProfileTransmitting}
            />
          </form>
          <form className={formStyles.form}>
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
              text='Update Password'
              btnStyle='primarySolid'
              onClick={handleUpdatePassword}
              enabled={isPasswordFormValid}
              loading={isPasswordTransmitting}
            />
          </form>
        </div>
      </div>
      <BottomNav>
        <Button
          text='Cancel'
          btnStyle='primaryOutlined'
          onClick={handleCancel}
        />
      </BottomNav>
    </>
  );
};

export default Profile;
