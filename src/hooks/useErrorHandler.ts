/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useAuthApi } from '../apps/auth/hook/useAuthApi';
import { useNavigate } from 'react-router-dom';

interface IHandleErrors {
  navigateError403: string;
  navigateError404: string;
}

export const useErrorHandler = () => {
  const { logout } = useAuthApi();
  const navigate = useNavigate();
  const errorsManage = (error: AxiosError, handlers: IHandleErrors) => {
    if (error.code?.includes('ERR_NETWORK')) {
      Swal.fire({
        icon: 'warning',
        title: `Failed connection`,
        text: `There isn't connection to the server, try reloading the page.`
      });
    } else if (error.message.includes('400')) {
      Swal.fire({
        icon: 'error',
        title: 'Bad request on inputs or params',
        text: `${(error as any).response?.data?.message ?? '---'}` 
      });
    } else if (error.message.includes('401')) {
      Swal.fire({
        icon: 'error',
        title: `Invalid token`,
        text: `Login again`,
      });
      logout();
    } else if (error.message.includes('403')) {
      Swal.fire({
        icon: 'error',
        title: `It looks you don't have the privileges for such action`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: `${(error as any).response?.data?.message ?? '---'}`,
      });
      navigate(handlers.navigateError403);
    } else if (error.message.includes('404')) {
      Swal.fire({
        icon: 'error',
        title: `Data not found`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: `${(error as any).response?.data?.message ?? '---'}`,
      });
      navigate(handlers.navigateError404)
    } else if (error.message.includes('500')) {
      Swal.fire({
        icon: 'error',
        title: `Server error`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      });
      navigate('/user-management/home');
    }
  }
  return errorsManage
}