import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthApi } from '../apps/auth/hook/useAuthApi'
import { Auth } from '../apps/auth/pages/Auth';
import { 
  Home, UsersManagament, RolesManagement, CatManagement,
  Logs, UserProfile, RoleCreate, RoleEdit, RolePage,
  CreateUser, EditUser
} from '../apps/user_management/pages';
import { Error } from '../shared';
import Swal from 'sweetalert2';
import { IStoreRedux } from '../store'

export const AppRouter = () => {
  const { user } = useSelector((state: IStoreRedux) => state.auth);
  const { logout, setUserAndOptions } = useAuthApi();
  const authLocal: string = localStorage.getItem('stateAuth') || 'not-authenticated';
  const endDate: number | undefined = localStorage.getItem('token-expire-date') === null ? undefined : parseInt(localStorage.getItem('token-expire-date')!);

  useEffect(() => {
    if (user.email === undefined && endDate && new Date().getTime() < endDate) {
      setUserAndOptions();
    } else if (endDate && new Date().getTime() > endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Token expired, need to login again',
        text: 'Redirecting back to login'
      })
      logout();
    }
  }, )

  return (
    <Routes>
      {
        authLocal === 'authenticated' ? (
          <>
            <Route path='/user-management/home' element={ <Home /> }/>
            <Route path='/user-management/users' element={ <UsersManagament /> }/>
            <Route path='/user-management/users/:id' element={ <EditUser /> } />
            <Route path='/user-management/users/create' element={ <CreateUser /> } />
            <Route path='/user-management/roles' element={ <RolesManagement /> }/>
            <Route path='/user-management/roles/:id' element={ <RolePage /> }/>
            <Route path='/user-management/roles/create' element={ <RoleCreate /> }/>
            <Route path='/user-management/roles/edit/:id' element={ <RoleEdit /> }/>
            <Route path='/user-management/logs' element={ <Logs /> }/>
            <Route path='/user-management/cat' element={ <CatManagement /> }/>
            <Route path='/user-management/profile/:id' element={ <UserProfile /> }/>
          </>
        ) : (
          <Route path='/login' element={ <Auth /> } />
        )
      }      
      <Route path='/*' element={ <Error /> }/>
      <Route path='/' element={ <Auth /> }/>
      <Route path='/login' element={ <Auth /> } />
    </Routes>
  )
}
