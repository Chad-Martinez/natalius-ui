import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import TopNav from '../components/dashboard/TopNav';
import axios from 'axios';
import { refresh } from '../services/tokenServices.ts';

axios.defaults.withCredentials = true;

export const MenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const ProtectedLayout: FC = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const accessToken = sessionStorage.getItem('at');
        if (accessToken) {
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const { data } = await refresh();
          const { accessToken } = data;

          sessionStorage.setItem('at', accessToken);
          prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios(prevRequest);
        }
        if (error.response.status === 418) {
          console.error('Invalid Token ', error);
          setIsAuth(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsAuth]);

  useEffect(() => {
    if (!isAuth) return navigate('/login');
  }, [navigate, isAuth]);

  useEffect(() => {
    const path = pathname.split('/');
    setTitle(path[1]);
  }, [pathname]);

  const handleToggle = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <div onClick={handleToggle}>
      <MenuContext.Provider value={{ isOpen, setIsOpen }}>
        <TopNav title={title} />
        <Outlet />
      </MenuContext.Provider>
    </div>
  );
};

export default ProtectedLayout;
