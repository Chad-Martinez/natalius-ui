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
