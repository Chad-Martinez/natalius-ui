import React from 'react'
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './store/AuthContext.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </AuthProvider>
  </React.StrictMode>
);
