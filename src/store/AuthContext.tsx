import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useRefreshToken from '../hooks/useRefreshToken';

export const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
  isLoading: boolean;
}>({
  isAuth: false,
  setIsAuth: () => {},
  isLoading: true,
});

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { verifyRefreshToken } = useRefreshToken();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await verifyRefreshToken();
        setIsAuth(true);
      } catch (error) {
        console.error('Token Error ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [verifyRefreshToken]);

  const store = useMemo(() => {
    return {
      isAuth,
      setIsAuth,
      isLoading,
    };
  }, [isAuth, setIsAuth, isLoading]);

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
};
