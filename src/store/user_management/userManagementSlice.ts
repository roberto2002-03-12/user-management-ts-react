import { createSlice } from '@reduxjs/toolkit';
import { IRole } from '../../apps/user_management/models';
import { IUser } from '../../apps/auth/model';

export const userManagementSlice = createSlice({
  name: 'user-management',
  initialState: {
    loadingState: 'loading', // loading | finished
    loadingRoutesState: 'loading', // loading | finished
    loadingRolesState: 'loading', // this is only for select purpose
    users: {
      count: 0,
      page: 1,
      data: []
    },
    user: {},
    roles: {
      count: 0,
      page: 1,
      data: []
    },
    role: {},
    rolesForSelect: [],
    routes: [], // why actions aren't here? well it's because 
    // you won't see it alone, it's usually with routes or roles
    // message aren't needed it.
  },
  reducers: {
    onLoadData: (state) => {
      state.loadingState = 'loading';
    },
    onLoadedUsers: (state, { payload }) => {
      state.loadingState = 'finished';
      state.users = payload;
    },
    onLoadedUser: (state, { payload }) => {
      state.loadingState = 'finished';
      state.user = payload;
    },
    onLoadedRoles: (state, { payload }) => {
      state.loadingState = 'finished';
      state.roles = payload;
    },
    onSetPageRole: (state, { payload }) => {
      state.roles.page = payload;
    },
    onLoadedRole: (state, { payload }) => {
      state.loadingState = 'finished';
      state.role = payload;
    },
    onLoadedRoutes: (state, { payload }) => {
      state.loadingRoutesState = 'finished';
      state.routes = payload;
    },
    onLoadRoutes: (state) => {
      state.loadingRoutesState = 'loading'
    },
    onDeleteRole: (state, { payload }) => {
      state.loadingState = 'finished';
      state.roles.data = state.roles.data.filter((val: IRole) => val.id !== payload);
    },
    onDeleteUser: (state, { payload }) => {
      state.loadingState = 'finished';
      state.users.data = state.users.data.filter((val: IUser) => val.id !== payload);
    },
    onLoadRolesForSelect: (state) => {
      state.loadingRolesState = 'loading';
    },
    onLoadedRolesForSelect: (state, { payload }) => {
      state.loadingRolesState = 'finished';
      state.rolesForSelect = payload;
    },
    onSelectUser: (state, { payload }) => {
      state.user = payload;
    },
    onChangeStatusToFinished: (state) => {
      state.loadingState = 'finished';
    }
  }
});

export const {
  onLoadData,
  onLoadedUsers,
  onLoadedUser,
  onLoadedRoles,
  onSetPageRole,
  onLoadedRole,
  onLoadedRoutes,
  onLoadRoutes,
  onDeleteRole,
  onDeleteUser,
  onLoadRolesForSelect,
  onLoadedRolesForSelect,
  onSelectUser,
  onChangeStatusToFinished
} = userManagementSlice.actions;