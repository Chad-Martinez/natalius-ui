import { Id, Slide, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message: string, type?: string, id?: string): Id => {
  const toastOptions: ToastOptions = {
    theme: 'dark',
    transition: Slide,
    toastId: id,
  };
  switch (type) {
    case 'success':
      return toast.success(message, toastOptions);
      break;
    case 'error':
      return toast.error(message, toastOptions);

    default:
      return toast.info(message, toastOptions);
      break;
  }
  toast(message);
};
