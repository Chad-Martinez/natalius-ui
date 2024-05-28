import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound.tsx';
import Landing from '../pages/Landing.tsx';
import Register from '../pages/Register.tsx';
import VerifyEmail from '../pages/VerifyEmail.tsx';
import Login from '../pages/Login.tsx';
import ProtectedLayout from '../layouts/ProtectedLayout.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Gigs from '../pages/Gigs/Gigs.tsx';
import { gigsLoader, gigNamesLoader } from './loaders.ts';
import LandingLayout from '../layouts/LandingLayout.tsx';
import Incomes from '../pages/Incomes/Incomes.tsx';
import IncomeForm from '../pages/Incomes/IncomeForm.tsx';
import GigForm from '../pages/Gigs/GigForm.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
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
        loader: gigsLoader,
      },
      {
        path: 'form',
        element: <GigForm />,
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
        path: 'form',
        element: <IncomeForm />,
        loader: gigNamesLoader,
      },
    ],
  },
]);
