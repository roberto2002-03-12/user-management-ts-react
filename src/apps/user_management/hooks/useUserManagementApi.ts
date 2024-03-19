import userManagementApi from '../../../api/user-management.api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../../../hooks'
import { useAuthApi } from '../../auth/hook/useAuthApi'
import Swal from 'sweetalert2';
import {
  onLoadData, onLoadedRoles, onLoadedRole, onLoadedRoutes,
  onLoadRoutes, onDeleteRole,
  
  onLoadedUsers, onLoadedUser, onDeleteUser, onLoadRolesForSelect,
  onLoadedRolesForSelect, onChangeStatusToFinished,
  
  IStoreRedux
} from '../../../store';

import { 
  IRoleQuery, IRoleInputs, IAction, IRoleInputsEdit, 
  IUserQuery, IUserInputs, IRoleForSelect,
  // IUserQuery
} from '../models';
import { AxiosError } from 'axios';

export const useUserManagementApi = () => {
  const { user } = useSelector((state: IStoreRedux) => state.userManagement)
  const { logout } = useAuthApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorManage = useErrorHandler();

  // recuerda agregar dataInputs porque esos datos serán los queries
  const getRoles = async (dataInputs?: IRoleQuery) => {
    dispatch(onLoadData());
    try {
      const url: string = `/privileges/role/?page=`
      + (dataInputs !== undefined && dataInputs.page !== undefined ? `${dataInputs.page}` : '1')
      + (dataInputs !== undefined && dataInputs.active !== undefined && dataInputs.active !== '' ? `&active=${dataInputs.active}` : '')
      + (dataInputs !== undefined && dataInputs.roleName !== undefined && dataInputs.roleName !== '' ? `&roleName=${dataInputs.roleName}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtStart !== undefined && dataInputs.createdAtStart !== '' && dataInputs.createdAtStart !== null ? `&createdAtStart=${dataInputs.createdAtStart}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtEnd !== undefined && dataInputs.createdAtEnd !== '' && dataInputs.createdAtEnd !== null ? `&createdAtEnd=${dataInputs.createdAtEnd}` : '')
      + (dataInputs !== undefined && dataInputs.order !== undefined ? `&order=${dataInputs.order}` : '');

      const { data } = await userManagementApi.get(url);
      dispatch(onLoadedRoles(data));
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
            title: 'Error on getting Roles Data',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            text: `${(error as any).response?.data?.message ?? '---'}`,
          });
          getRoles();
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  };

  const getRolesForSelect = async () => {
    dispatch(onLoadRolesForSelect());
    try {
      const { data } = await userManagementApi.get('/privileges/role-select');
      dispatch(onLoadedRolesForSelect(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, 
          { 
            navigateError403: '/user-management/home',
            navigateError404: '/user-management/users'
          }
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  const getOneRole = async (id: number, includeActions?: boolean) => {
    dispatch(onLoadData());
    try {
      
      const url = `/privileges/role/${id}`
      + (includeActions !== undefined && includeActions !== false ? `/?includeActions=${includeActions}` : '')
      const { data } = await userManagementApi.get(url);
      dispatch(onLoadedRole(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, 
          { 
            navigateError403: '/user-management/home',
            navigateError404: '/user-management/roles'
          }
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  const getRoutes = async () => {
    dispatch(onLoadRoutes())
    try {
      const { data } = await userManagementApi.get('/privileges/route?includeActions=true');
      dispatch(onLoadedRoutes(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/home'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  const createRole = async (dataInputs: IRoleInputs, actionsData?: IAction[]) => {
    try {
      if (actionsData && actionsData.length > 0) {
        const newData = {
          ...dataInputs,
          action: actionsData
        };
        await userManagementApi.post('/privileges/role', newData);
        navigate('/user-management/roles');
      } else {
        await userManagementApi.post('/privileges/role', dataInputs);
        navigate('/user-management/roles');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/home'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  };

  const editRole = async (dataInputs: IRoleInputsEdit, id: number, actionData?: IAction[]) => {
    dispatch(onLoadData());
    dispatch(onLoadRoutes());
    try {
      if (actionData && actionData.length > 0) {
        const newData = {
          ...dataInputs,
          action: actionData
        };
        await userManagementApi.put(`/privileges/role/${id}`, newData);
        navigate('/user-management/roles');
      } else {
        await userManagementApi.put(`/privileges/role/${id}`, dataInputs);
        navigate('/user-management/roles');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/roles'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  const desactivateRole = async (id: number) => {
    dispatch(onLoadData());
    try {
      await userManagementApi.patch(`/privileges/role/${id}`);
      dispatch(onDeleteRole(id));
      Swal.fire({
        icon: 'success',
        title: `Role changed`
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/roles'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  // User Section

  const getUsers = async (dataInputs?: IUserQuery) => {
    dispatch(onLoadData());
    try {
      const url: string = `/auth/user/?page=`
      + (dataInputs !== undefined && dataInputs.page !== undefined ? `${dataInputs.page}` : '1')
      + (dataInputs !== undefined && dataInputs.active !== undefined && dataInputs.active !== '' ? `&active=${dataInputs.active}` : '')
      + (dataInputs !== undefined && dataInputs.fullName !== undefined && dataInputs.fullName !== '' ? `&fullName=${dataInputs.fullName}` : '')
      + (dataInputs !== undefined && dataInputs.email !== undefined && dataInputs.email !== '' ? `&email=${dataInputs.email}` : '')
      + (dataInputs !== undefined && dataInputs.roleName !== undefined && dataInputs.roleName !== '' ? `&roleName=${dataInputs.roleName}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtStart !== undefined && dataInputs.createdAtStart !== '' && dataInputs.createdAtStart !== null && dataInputs.createdAtStart ? `&createdAtStart=${dataInputs.createdAtStart}` : '')
      + (dataInputs !== undefined && dataInputs.createdAtEnd !== undefined && dataInputs.createdAtEnd !== '' && dataInputs.createdAtEnd !== null && dataInputs.createdAtEnd ? `&createdAtEnd=${dataInputs.createdAtEnd}` : '')
      + (dataInputs !== undefined && dataInputs.order !== undefined ? `&order=${dataInputs.order}` : '');

      const { data } = await userManagementApi(url);
      dispatch(onLoadedUsers(data));
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
          getUsers();
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  const desactivateUser = async (id: number) => {
    dispatch(onLoadData());
    try {
      await userManagementApi.patch(`/auth/user/${id}`);
      dispatch(onDeleteUser(id))
      Swal.fire({
        icon: 'success',
        title: 'User status changed'
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/users'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  };

  const createUser = async (user: IUserInputs, role?: IRoleForSelect[]) => {
    dispatch(onLoadData());
    try {
      const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        birth: user.birth,
        phoneNumber: user.phoneNumber
      };

      const newUser = {
        email: user.email,
        password: user.password
      };

      await userManagementApi.post('/auth/user', { user: newUser, profile, role });
      navigate('/user-management/users');
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/users'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  const getOneUser = async (id: number) => {
    dispatch(onLoadData())
    try {
      if (typeof user.email === 'undefined') {
        const { data } = await userManagementApi.get(`/auth/user/${id}`);
        dispatch(onLoadedUser(data));
      } else {
        dispatch(onChangeStatusToFinished());
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/users'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  };

  const assignNewRolesToUser = async (data: IRoleForSelect[], userId: number) => {
    dispatch(onLoadData());
    try {
      await userManagementApi.post('/privileges/role/assign/', { userId, roles: data });
      navigate('/user-management/users');
    } catch (error) {
      if (error instanceof AxiosError) {
        errorManage(error, {
          navigateError403: '/user-management/home',
          navigateError404: '/user-management/users'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error on request',
          text: 'An error has ocurred'
        })
        navigate('/user-management/home');
      }
      console.log(error);
    }
  }

  return {
    getRoles,
    getRolesForSelect,
    getOneRole,
    getRoutes,
    createRole,
    editRole,
    desactivateRole,

    getUsers,
    desactivateUser,
    createUser,
    getOneUser,
    assignNewRolesToUser
  }
}