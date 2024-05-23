import { FC, useCallback, useEffect, useState } from 'react';
import verifyStyles from './VerifyEmail.module.css';
import styles from '../styles/common.module.css';
import ConfettiExplosion from 'react-confetti-explosion';
import Nav from '../components/ui/Nav';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/authServices';
import Logo from '../components/ui/Logo';

const VerifyEmail: FC = () => {
  const [failed, setFailed] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const confirmEmail = useCallback(async () => {
    try {
      if (id) {
        await verifyEmail(id);
        setTimeout(() => {
          console.log('trigging redirect');
          navigate('/login');
        }, 2500);
      }
    } catch (error) {
      console.error('Confirm Email Error: ', error);
      setFailed(true);
    }
  }, [id, navigate]);

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  return (
    <>
      <Nav />
      <div className={styles.containerCentered}>
        <div className={verifyStyles.confetti}>
          <Logo addedStyles={{ width: '35%' }} />
          {failed ? '' : <ConfettiExplosion force={0.7} />}
          <h1>{failed ? 'Oh wait, our bad!' : 'Congratulations'}</h1>
          <h5>
            {failed
              ? 'Try your request again.'
              : 'Your email has been verified'}
          </h5>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
