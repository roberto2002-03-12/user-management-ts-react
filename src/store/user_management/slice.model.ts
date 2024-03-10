import { IUser } from '../../apps/auth/model'
import { IRole, IRoute } from '../../apps/user_management/models/privileges.model';

export type TypeLoadingState = 'loading' | 'finished';  

export interface UserManagementSlice {
  loadingState: TypeLoadingState;
  loadingRoutesState: TypeLoadingState;
  loadingRolesState: TypeLoadingState;
  users: {
    count: number;
    page: number;
    data: IUser[];
  };
  user: IUser;
  roles: {
    count: number;
    page: number;
    data: IRole[];
  };
  role: IRole;
  rolesForSelect: IRole[];
  routes: IRoute[];
}