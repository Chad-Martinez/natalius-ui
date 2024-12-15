import { FC, useCallback, useEffect, useState } from 'react';
import verifyStyles from './VerifyEmail.module.css';
import ConfettiExplosion from 'react-confetti-explosion';
import { useParams, useNavigate } from 'react-router-dom';
// import { verifyEmail } from '../../services/authServices';
import Logo from '../../components/ui/Logo/Logo';
import useAxios from '../../hooks/useAxios';

const VerifyEmail: FC = () => {
  const [failed, setFailed] = useState(false);
  const { axiosInstance, boundAuthServices } = useAxios();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const confirmEmail = useCallback(async () => {
    try {
      if (id) {
        await boundAuthServices.verifyEmail({ axiosInstance, token: id });
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    } catch (error) {
      console.error('Confirm Email Error: ', error);
      setFailed(true);
    }
  }, [id, navigate, axiosInstance, boundAuthServices]);

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  return (
    <div className={verifyStyles.confetti}>
      <Logo
        addedStyles={{
          width: '35%',
          maxWidth: '300px',
          alignSelf: 'center',
          marginBottom: '15px',
        }}
      />
      {failed ? '' : <ConfettiExplosion force={0.7} />}
      <h1>{failed ? 'Oh wait, our bad!' : 'Congratulations'}</h1>
      <h5>
        {failed ? 'Try your request again.' : 'Your email has been verified'}
      </h5>
    </div>
  );
};

export default VerifyEmail;
