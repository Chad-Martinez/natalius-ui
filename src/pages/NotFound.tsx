import { FC } from 'react';
import { useRouteError } from 'react-router-dom';
import styles from '../styles/common.module.css';

type RouteError = {
  statusText: string;
  message: string;
};

const NotFound: FC = (): JSX.Element => {
  const error = useRouteError() as RouteError;
  console.error('Route Error ', error);

  return (
    <div id='error-page' className={styles.containerCentered}>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
