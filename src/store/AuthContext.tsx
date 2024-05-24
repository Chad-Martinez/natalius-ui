import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
}>({
  isAuth: false,
  setIsAuth: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
