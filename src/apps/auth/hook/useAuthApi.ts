import userManagementApi from '../../../api/user-management.api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  onLogin, onCheckingAuth, onSubmitRecovery, onResetRecovery,
  onStartRecovery, onLogoutUser, onSetOptions, onSetUser,
  onLoadProfile, onSetNewProfile, onSetLoadedProfile
} from '../../../store';
import { 
  IUserLoginInputs, IUser, 
  IRecoveryInputs, IRecoveryChangePasswordInputs, IUserProfileInputs, IUserChangePasswordInputs
} from '../model'
import { ISideBarOptions } from '../../../models'
import { AxiosError } from 'axios';

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
      if (error instanceof AxiosError) {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: error.response?.data.message ?? 'Failed on making a request'
        })
      }
      Swal.fire({
        icon: 'error',
        title: 'Error on request',
        text: 'An error has ocurred'
      })
      navigate(0);
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

  const updateProfile = async (data: IUserProfileInputs) => {
    dispatch(onLoadProfile())
    try {
      await userManagementApi.put('/profile', data);
      const user: IUser = JSON.parse(localStorage.getItem('user')!);
      const newUser: IUser = {
        ...user,
        profile: {
          id: user.profile?.id ?? 1000000000,
          firstName: data.firstName,
          lastName: data.lastName,
          birth: `${data.birth?.toString()}`,
          phoneNumber: data.phoneNumber,
          userId: user.id
        }
      }

      localStorage.setItem('user', JSON.stringify(newUser));
      dispatch(onSetNewProfile(newUser));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ERR_NETWORK') {
          Swal.fire({
            icon: 'warning',
            title: `Failed connection`,
            text: `There isn't connection to the server, try reloading the page.`
          });
        } else if (error.message.includes('400')) {
          Swal.fire({
            icon: 'error',
            title: 'Error on getting Users Data',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            text: `${(error as any).response?.data?.message ?? '---'}`
          });
          setTimeout(() => dispatch(onSetLoadedProfile()), 5000);
        } else if (error.message.includes('401')) {
          Swal.fire({
            icon: 'error',
            title: `Invalid token`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          navigate('/user-management/home');
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Error on request',
        text: 'An error has ocurred'
      })
      navigate('/user-management/home');
    }
  };

  const changePassword = async (data: IUserChangePasswordInputs) => {
    dispatch(onLoadProfile());
    try {
      delete data.repeatPassowrd;
      await userManagementApi.patch('/auth/user/change-password', data);
      dispatch(onSetLoadedProfile());
      Swal.fire({
        icon: 'success',
        title: 'Password changed'
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ERR_NETWORK') {
          Swal.fire({
            icon: 'warning',
            title: `Failed connection`,
            text: `There isn't connection to the server, try reloading the page.`
          });
        } else if (error.message.includes('400')) {
          Swal.fire({
            icon: 'error',
            title: 'Error on getting Users Data',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            text: `${(error as any).response?.data?.message ?? '---'}`,
          });
        } else if (error.message.includes('401')) {
          Swal.fire({
            icon: 'error',
            title: `Invalid token`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          navigate('/user-management/home');
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Error on request',
        text: 'An error has ocurred'
      })
      navigate('/user-management/home');
      dispatch(onSetLoadedProfile());
    }
  }

  return {
    login,
    sendRecovery,
    changePasswordRecovery,
    logout,
    setUserAndOptions,
    updateProfile,
    changePassword
  }
}