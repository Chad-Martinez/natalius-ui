import { FC, useEffect, lazy, Suspense, useContext } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  isRouteErrorResponse,
  redirect,
  useRouteError,
} from 'react-router-dom';
import { clubsLoader, clubNamesLoader } from './routes/clubLoaders.ts';
import { vendorsLoader } from './routes/vendorLoaders.ts';
import {
  expenseDashboardLoader,
  paginatedExpenseLoader,
} from './routes/expenseLoaders.ts';
import {
  incomeDashboardLoader,
  paginatedIncomeLoader,
} from './routes/incomeLoaders.ts';
import { dashboardLoader, sprintLoader } from './routes/dashboardLoaders.ts';
import Profile from './pages/Profile/Profile.tsx';
import { profileLoader } from './routes/profileLoaders.ts';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.tsx';
import PasswordReset from './pages/PasswordReset/PasswordReset.tsx';
import useAxios from './hooks/useAxios.tsx';
import { AuthContext } from './store/AuthContext.tsx';

const LandingLayout = lazy(() => import('./layouts/LandingLayout.tsx'));
const ProtectedLayout = lazy(() => import('./layouts/ProtectedLayout.tsx'));
const Landing = lazy(() => import('./pages/Landing/Landing.tsx'));
const Login = lazy(() => import('./pages/Login/Login.tsx'));
const Register = lazy(() => import('./pages/Register/Register.tsx'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail/VerifyEmail.tsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.tsx'));
const Clubs = lazy(() => import('./pages/Clubs/Clubs.tsx'));
const ClubForm = lazy(() => import('./pages/Clubs/ClubForm.tsx'));
const CompleteShiftWizard = lazy(
  () => import('./pages/CompleteShiftWizard/CompleteShiftWizard.tsx')
);
const ShiftForm = lazy(() => import('./pages/Shifts/ShiftForm.tsx'));
const Incomes = lazy(() => import('./pages/Incomes/Incomes.tsx'));
const Expenses = lazy(() => import('./pages/Expenses/Expenses.tsx'));
const ExpenseForm = lazy(() => import('./pages/Expenses/ExpenseForm.tsx'));
const Vendors = lazy(() => import('./pages/Vendors/Vendors.tsx'));
const VendorForm = lazy(() => import('./pages/Vendors/VendorForm.tsx'));
const ViewExpenses = lazy(() => import('./pages/Expenses/ViewExpenses.tsx'));
const ViewIncome = lazy(() => import('./pages/Incomes/ViewIncome.tsx'));
const SprintGoalForm = lazy(
  () => import('./pages/Dashboard/SprintGoalForm.tsx')
);

const App: FC = (): JSX.Element => {
  const { setupAxiosInterceptors } = useAxios();
  const { isAuth, isLoading } = useContext(AuthContext);

  useEffect(() => {
    const cleanup = setupAxiosInterceptors();
    return cleanup;
  }, [setupAxiosInterceptors]);

  const ErrorBoundary: React.FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
      console.error('Error boundary ', error);
      return (
        <div>
          <h1>
            Error {error.status}: {error.statusText}
          </h1>
          <p>{error.data || 'An unexpected error occurred.'}</p>
        </div>
      );
    }
    return (
      <div>
        <h1>An unexpected error occurred</h1>
        <p>{(error as Error).message || 'Something went wrong.'}</p>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Landing /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'verify/:id', element: <VerifyEmail /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'password-reset/:token', element: <PasswordReset /> },
      ],
    },
    {
      path: '/',
      element: <ProtectedLayout />,
      errorElement: <ErrorBoundary />,
      loader: () => {
        if (!isAuth && !isLoading) {
          throw redirect('/login');
        }
        return null;
      },
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
          loader: isAuth && dashboardLoader,
        },
        {
          path: 'dashboard/sprint-form',
          element: <SprintGoalForm />,
          loader: isAuth && sprintLoader,
        },
        {
          path: 'profile',
          element: <Profile />,
          loader: isAuth && profileLoader,
        },
        { path: 'clubs', element: <Clubs />, loader: isAuth && clubsLoader },
        { path: 'clubs/club-form', element: <ClubForm /> },
        {
          path: 'shifts/shift-form',
          element: <ShiftForm />,
          loader: isAuth && clubNamesLoader,
        },
        {
          path: 'shifts/shift-form/:clubId',
          element: <ShiftForm />,
          loader: isAuth && clubNamesLoader,
        },
        {
          path: 'shifts/complete-shift/:shiftId',
          element: <CompleteShiftWizard />,
          loader: isAuth && clubNamesLoader,
        },
        {
          path: 'income',
          element: <Incomes />,
          loader: isAuth && incomeDashboardLoader,
        },
        {
          path: 'income/view-income',
          element: <ViewIncome />,
          loader: isAuth && paginatedIncomeLoader,
        },
        {
          path: 'expenses',
          element: <Expenses />,
          loader: isAuth && expenseDashboardLoader,
        },
        {
          path: 'expenses/expense-form',
          element: <ExpenseForm />,
          loader: isAuth && vendorsLoader,
        },
        {
          path: 'expenses/view-expenses',
          element: <ViewExpenses />,
          loader: isAuth && paginatedExpenseLoader,
        },
        { path: 'vendors', element: <Vendors /> },
        { path: 'vendors/vendor-form', element: <VendorForm /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
