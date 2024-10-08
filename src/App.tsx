import { FC, useEffect, lazy, Suspense, useContext } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import Profile from './pages/Profile.tsx';
import { profileLoader } from './routes/profileLoaders.ts';
import ForgotPassword from './pages/ForgotPassword.tsx';
import PasswordReset from './pages/PasswordReset.tsx';
import { getShiftDetails } from './routes/shiftLoaders.ts';
import useAxios from './hooks/useAxios.tsx';
import { AuthContext } from './store/AuthContext.tsx';

const LandingLayout = lazy(() => import('./layouts/LandingLayout.tsx'));
const ProtectedLayout = lazy(() => import('./layouts/ProtectedLayout.tsx'));
const Landing = lazy(() => import('./pages/Landing.tsx'));
const Login = lazy(() => import('./pages/Login.tsx'));
const Register = lazy(() => import('./pages/Register.tsx'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.tsx'));
const Clubs = lazy(() => import('./pages/Clubs/Clubs.tsx'));
const ClubForm = lazy(() => import('./pages/Clubs/ClubForm.tsx'));
const CompleteShiftWizard = lazy(
  () => import('./pages/CompleteShiftWizard/CompleteShiftWizard.tsx')
);
const ShiftForm = lazy(() => import('./pages/Clubs/ShiftForm.tsx'));
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

const App: FC = (): JSX.Element => {
  const { setupAxiosInterceptors } = useAxios();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    const cleanup = setupAxiosInterceptors();
    return cleanup;
  }, [setupAxiosInterceptors]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingLayout />,
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
          path: 'clubs/shift-form/:club',
          element: <ShiftForm />,
          loader: isAuth && clubNamesLoader,
        },
        {
          path: 'clubs/shift-form',
          element: <ShiftForm />,
          loader: isAuth && clubNamesLoader,
        },
        {
          path: 'complete-shift/:shiftId',
          element: <CompleteShiftWizard />,
          loader: isAuth && getShiftDetails,
        },
        {
          path: 'income',
          element: <Incomes />,
          loader: isAuth && incomeDashboardLoader,
        },
        {
          path: 'incomes/income-form',
          element: <IncomeForm />,
          loader: isAuth && clubNamesLoader,
        },
        {
          path: 'incomes/view-income',
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
          path: 'incomes/view-expenses',
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
