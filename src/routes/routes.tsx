import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound.tsx';
import Landing from '../pages/Landing.tsx';
import Register from '../pages/Register.tsx';
import VerifyEmail from '../pages/VerifyEmail.tsx';
import Login from '../pages/Login.tsx';
import ProtectedLayout from '../layouts/ProtectedLayout.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Gigs from '../pages/Gigs/Gigs.tsx';
import { loader as gigsLoader } from '../pages/Gigs/Gigs.tsx';
import LandingLayout from '../layouts/LandingLayout.tsx';
import Incomes from '../pages/Incomes/Incomes.tsx';

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
    ],
  },
]);
