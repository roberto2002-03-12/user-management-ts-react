import { AuthSlice, UserManagementSlice } from './'

export interface IStoreRedux {
  auth: AuthSlice;
  userManagement: UserManagementSlice;
}