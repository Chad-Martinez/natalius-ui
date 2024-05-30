import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './store/AuthContext.tsx';
import { router } from './routes/routes.tsx';

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
