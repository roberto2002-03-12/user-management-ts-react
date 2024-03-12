import { AuthSlice, UserManagementSlice, CatSlice } from './'

export interface IStoreRedux {
  auth: AuthSlice;
  userManagement: UserManagementSlice;
  cat: CatSlice;
}