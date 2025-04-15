import { useEffect, useState } from 'react';
import style from './Toast.module.css';

type ToastType = 'success' | 'error';

type ToastState = {
  message: string;
  type: ToastType;
  visible: boolean;
};

const Toast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  });

  useEffect(() => {
    const handleShowToast = (e: CustomEvent<ToastState>) => {
      setToast({ ...e.detail, visible: true });

      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
    };

    window.addEventListener('show-toast', handleShowToast as EventListener);

    return () => {
      window.removeEventListener(
        'show-toast',
        handleShowToast as EventListener
      );
    };
  }, []);

  if (!toast.visible) return null;

  return (
    <div className={`${style.toast} ${style[toast.type]}`}>{toast.message}</div>
  );
};

export default Toast;
