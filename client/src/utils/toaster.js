import { toast } from 'react-toastify';

export const showToast = (message, type = 'error') => {
    if (type === 'success') {
        toast.success(message);
    } else {
        toast.error(message);
    }
};