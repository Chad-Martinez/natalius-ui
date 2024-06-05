import { FC } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import Logo from '../components/ui/Logo/Logo';
import styles from './NotFound.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

type RouteError = {
  statusText: string;
  message: string;
};

const NotFound: FC = (): JSX.Element => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  console.error('Route Error ', error);

  return (
    <div id='error-page' className={styles.errorContainer}>
      <Logo addedStyles={{ width: '25%' }} />
      <h1>Oops!</h1>
      <p className={styles.subtitle}>
        Sorry, the resource you're trying to access isn't responding or doesn't
        exist.
      </p>
      <div>
        <FontAwesomeIcon
          icon={faLeftLong}
          className={styles.faIcon}
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default NotFound;
