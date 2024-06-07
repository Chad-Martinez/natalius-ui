import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import TopNav from '../components/dashboard/TopNav';
import styles from './ProtectedLayout.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const MenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
}>({
  isOpen: false,
  setIsOpen: () => {},
  showPopup: false,
  setShowPopup: () => {},
});

const ProtectedLayout: FC = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { isAuth, isLoading } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split('/');
    setTitle(path[1]);
  }, [pathname]);

  const handleToggle = () => {
    if (isOpen) setIsOpen(false);
    if (showPopup) setShowPopup(false);
  };

  return isAuth ? (
    <div onClick={handleToggle}>
      <MenuContext.Provider
        value={{ isOpen, setIsOpen, showPopup, setShowPopup }}
      >
        <TopNav title={title} />
        {/* {pathname !== '/dashboard' ? (
          <div className={styles.backContainer}>
            <FontAwesomeIcon
              className={styles.back}
              icon={faArrowLeft}
              onClick={() => navigate(-1)}
            />
          </div>
        ) : (
          ''
        )} */}
        <div className={styles.container}>
          <Outlet />
        </div>
      </MenuContext.Provider>
    </div>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <Navigate to='/login' replace />
  );
};

export default ProtectedLayout;
