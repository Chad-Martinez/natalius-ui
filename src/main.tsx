import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import NotFound from './pages/NotFound.tsx';
import Landing from './pages/Landing.tsx';
import Register from './pages/Register.tsx';
import { ToastContainer } from 'react-toastify';
import VerifyEmail from './pages/VerifyEmail.tsx';
import Login from './pages/Login.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { AuthProvider } from './store/AuthContext.tsx';
import Gigs from './pages/Gigs/Gigs.tsx';
import Gig from './pages/Gig.tsx';
import axios from 'axios';
import { loader as gigsLoader } from './pages/Gigs/Gigs.tsx';

axios.interceptors.request.use((config) => {
  console.log('intercepting');
  const accessToken = sessionStorage.getItem('at');
  if (accessToken) {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/verify/:id',
    element: <VerifyEmail />,
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
        path: ':gigId',
        element: <Gig />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </AuthProvider>
  </React.StrictMode>
);
