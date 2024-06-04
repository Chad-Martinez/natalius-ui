import { FC, useContext, useEffect } from 'react';
import axios from 'axios';
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';
import { gigsLoader, gigNamesLoader } from './routes/loaders.ts';
import { AuthContext } from './store/AuthContext.tsx';
import useRefreshToken from './hooks/useRefreshToken.tsx';
import LandingLayout from './layouts/LandingLayout.tsx';
import Landing from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import VerifyEmail from './pages/VerifyEmail.tsx';
import NotFound from './pages/NotFound.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Gigs from './pages/Gigs/Gigs.tsx';
import GigForm from './pages/Gigs/GigForm.tsx';
import ShiftForm from './pages/Gigs/ShiftForm.tsx';
import Incomes from './pages/Incomes/Incomes.tsx';
import IncomeForm from './pages/Incomes/IncomeForm.tsx';
import Expenses from './pages/Expenses/Expenses.tsx';
import ExpenseForm from './pages/Expenses/ExpenseForm.tsx';
import Vendors from './pages/Vendors/Vendors.tsx';
import VendorForm from './pages/Vendors/VendorForm.tsx';

axios.defaults.withCredentials = true;

const App: FC = (): JSX.Element => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { verifyRefreshToken } = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          const accessToken = sessionStorage.getItem('at');
          config.headers.Authorization = `Bearer ${accessToken}`;
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
          const accessToken = await verifyRefreshToken();
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(prevRequest);
        }
        if (error.response.status === 418) {
          console.error('Intercept Response Error: ', error);
          sessionStorage.removeItem('at');
          setIsAuth(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsAuth, verifyRefreshToken]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: !isAuth ? <LandingLayout /> : <Navigate to='/dashboard' />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/verify/:id',
          element: <VerifyEmail />,
        },
      ],
      errorElement: <NotFound />,
    },
    {
      path: '/dashboard',
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
    {
      path: '/gigs',
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Gigs />,
          loader: isAuth && gigsLoader,
        },
        {
          path: 'gig-form',
          element: <GigForm />,
        },
        {
          path: 'shift-form/:gig',
          element: <ShiftForm />,
          loader: isAuth && gigNamesLoader,
        },
      ],
    },
    {
      path: '/income',
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Incomes />,
        },
        {
          path: 'income-form',
          element: <IncomeForm />,
          loader: isAuth && gigNamesLoader,
        },
      ],
    },
    {
      path: '/expenses',
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Expenses />,
        },
        {
          path: 'expense-form',
          element: <ExpenseForm />,
        },
      ],
    },
    {
      path: '/vendors',
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Vendors />,
        },
        {
          path: 'vendor-form',
          element: <VendorForm />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
