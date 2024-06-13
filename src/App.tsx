import { FC, useContext, useEffect, lazy } from 'react';
import axios from 'axios';
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';
import { gigsLoader, gigNamesLoader } from './routes/gigLoaders.ts';
import { AuthContext } from './store/AuthContext.tsx';
import useRefreshToken from './hooks/useRefreshToken.tsx';
import { vendorsLoader } from './routes/vendorLoaders.ts';
import { paginatedExpenseLoader } from './routes/expenseLoaders.ts';
import {
  incomeDashboardLoader,
  paginatedIncomeLoader,
} from './routes/incomeLoaders.ts';
import { dashboardLoader, sprintLoader } from './routes/dashboardLoaders.ts';

const LandingLayout = lazy(() => import('./layouts/LandingLayout.tsx'));
const Landing = lazy(() => import('./pages/Landing.tsx'));
const Login = lazy(() => import('./pages/Login.tsx'));
const Register = lazy(() => import('./pages/Register.tsx'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));
const ProtectedLayout = lazy(() => import('./layouts/ProtectedLayout.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.tsx'));
const Gigs = lazy(() => import('./pages/Gigs/Gigs.tsx'));
const GigForm = lazy(() => import('./pages/Gigs/GigForm.tsx'));
const ShiftForm = lazy(() => import('./pages/Gigs/ShiftForm.tsx'));
const Incomes = lazy(() => import('./pages/Incomes/Incomes.tsx'));
const IncomeForm = lazy(() => import('./pages/Incomes/IncomeForm.tsx'));
const Expenses = lazy(() => import('./pages/Expenses/Expenses.tsx'));
const ExpenseForm = lazy(() => import('./pages/Expenses/ExpenseForm.tsx'));
const Vendors = lazy(() => import('./pages/Vendors/Vendors.tsx'));
const VendorForm = lazy(() => import('./pages/Vendors/VendorForm.tsx'));
const ViewExpenses = lazy(() => import('./pages/Expenses/ViewExpenses.tsx'));
const ViewIncome = lazy(() => import('./pages/Incomes/ViewIncome.tsx'));
const SprintGoalForm = lazy(
  () => import('./pages/Dashboard/SprintGoalForm.tsx')
);

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
          loader: dashboardLoader,
        },
        {
          path: 'sprint-form',
          element: <SprintGoalForm />,
          loader: sprintLoader,
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
        {
          path: 'shift-form',
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
          loader: isAuth && incomeDashboardLoader,
        },
        {
          path: 'income-form',
          element: <IncomeForm />,
          loader: isAuth && gigNamesLoader,
        },
        {
          path: 'view-income',
          element: <ViewIncome />,
          loader: isAuth && paginatedIncomeLoader,
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
          loader: isAuth && vendorsLoader,
        },
        {
          path: 'view-expenses',
          element: <ViewExpenses />,
          loader: isAuth && paginatedExpenseLoader,
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
