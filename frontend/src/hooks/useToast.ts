type ToastType = 'success' | 'error';

export const useToast = () => {
  return (message: string, type: ToastType = 'success') => {
    const event = new CustomEvent('show-toast', {
      detail: { message, type },
    });
    window.dispatchEvent(event);
  };
};
