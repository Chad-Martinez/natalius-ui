import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './store/AuthContext.tsx';
import App from './App.tsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import advancedFormats from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormats);
dayjs.extend(localizedFormat);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense>
    <AuthProvider>
      <App />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </AuthProvider>
  </Suspense>
);
