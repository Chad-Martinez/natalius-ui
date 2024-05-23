import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

export const AuthContext = createContext({
  isAuth: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAuth: (value: boolean) => {},
});

export const AuthProvider = (props: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(false);

  const updateAuth = useCallback((value: boolean): void => {
    setIsAuth(value);
  }, []);

  const authStore = useMemo(
    () => ({
      isAuth,
      updateAuth,
    }),
    [isAuth, updateAuth]
  );
  return (
    <AuthContext.Provider value={authStore}>
      {props.children}
    </AuthContext.Provider>
  );
};
