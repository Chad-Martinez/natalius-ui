import { Slide, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message: string, type?: string, id?: string): void => {
  const toastOptions: ToastOptions = {
    theme: 'dark',
    transition: Slide,
    toastId: id,
  };
  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    default:
      toast.info(message, toastOptions);
      break;
  }
};
