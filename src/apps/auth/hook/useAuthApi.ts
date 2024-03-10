import userManagementApi from '../../../api/user-management.api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  onLogin, onCheckingAuth, onSubmitRecovery, onResetRecovery,
  onStartRecovery, onLogoutUser, onSetOptions, onSetUser
} from '../../../store';
import { 
  IUserLoginInputs, IUser, 
  IRecoveryInputs, IRecoveryChangePasswordInputs
} from '../model'
import { ISideBarOptions } from '../../../models'

export const useAuthApi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (dataInputs: IUserLoginInputs) => {
    dispatch(onCheckingAuth());
    try {
      const { data } = await userManagementApi.post('/auth/login', dataInputs);

      // this is where i definy the options for the sidebar
      const options: ISideBarOptions[] = [];

      if (typeof data.user.routes !== 'undefined') {
        for (let i = 0; i < data.user.routes.length; i++) {
          const option: ISideBarOptions = {
            menu: '',
            icon: '',
            url: ''
          };

          if (data.user.routes[i] === '/user-management/users') {
            option.menu = 'User management';
            option.icon = "users";
            option.url = data.user.routes[i];
          } else if (data.user.routes[i] === '/user-management/roles') {
            option.menu = 'Roles management';
            option.icon = "roles";
            option.url = data.user.routes[i];
          } else if (data.user.routes[i] === '/user-management/cat') {
            option.menu = 'Cat management';
            option.icon = "cats";
            option.url = data.user.routes[i];
          }

          if (option.menu !== '') options.push(option);
        }
      }

      options.unshift(
        {
          menu: 'Home',
          icon: 'home',
          url: '/user-management/home'
        },
      )
      
      // in the future maybe i'll create logs management, of course people will only
      // read, there won't be an option to write or delete
      options.push(
        {
          menu: 'Logs',
          icon: 'logs',
          url: '/user-management/logs'
        },
      )

      const date = new Date();

      localStorage.setItem('stateAuth', 'authenticated');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', `${date.getTime()}`);
      localStorage.setItem('token-expire-date', `${date.setHours(date.getHours() + 4)}`);
      localStorage.setItem('user', JSON.stringify(data.user as IUser));
      localStorage.setItem('options', JSON.stringify(options));

      dispatch(onSetOptions(options));
      dispatch(onLogin(data.user));
      navigate('/user-management/home');
    } catch (error: unknown) {
      dispatch(onLogoutUser());
      Swal.fire({
        icon: 'error',
        title: 'Error on trying login',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: `${(error as any).response?.data?.message ?? '---'}`
      });
    }
  }

  const sendRecovery = async (dataInputs: IRecoveryInputs) => {
    dispatch(onCheckingAuth());
    try {
      const { data } = await userManagementApi.put('/auth/send-recovery', dataInputs);
      dispatch(onSubmitRecovery());
      Swal.fire(data.message);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const changePasswordRecovery = async (dataInputs: IRecoveryChangePasswordInputs) => {
    dispatch(onCheckingAuth());
    try {
      delete dataInputs.repeatPassword;
      const { data } = await userManagementApi.put('/auth/change-forgot-password', dataInputs);
      dispatch(onResetRecovery()); // this set authState to "not-authenticated" which sends you back to login
      Swal.fire({
        icon: 'success',
        title: 'Success on changing password',
        text: `${data.message}`
      });
    } catch (error: unknown) {
      dispatch(onStartRecovery());
      Swal.fire({
        icon: 'error',
        title: 'Error on trying to change password',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: `${(error as any).response?.data?.message ?? '---'}`
      });
    }
  }

  const logout = () => {
    dispatch(onCheckingAuth());
    localStorage.clear();
    dispatch(onLogoutUser());
    navigate('/login')
  }

  const setUserAndOptions = () => {
    const user: string = localStorage.getItem('user') || `{ email: 'Need to login again' }`;
    const options: string  = localStorage.getItem('options') || '[]';
    dispatch(onSetOptions(JSON.parse(options)));
    dispatch(onSetUser(JSON.parse(user)));
  };

  return {
    login,
    sendRecovery,
    changePasswordRecovery,
    logout,
    setUserAndOptions
  }
}