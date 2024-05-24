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
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuth) return navigate('/login');
  }, [navigate, isAuth]);

  useEffect(() => {
    const path = pathname.split('/');
    if (path.length === 2) {
      setTitle(path[1]);
    } else {
      setTitle(path[2]);
    }
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
