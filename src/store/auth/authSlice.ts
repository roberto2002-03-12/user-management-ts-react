import { createSlice } from '@reduxjs/toolkit';

// type TypeEmailState = 'sent' | 'in-process' | 'not-sent';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authState: 'not-authenticated', // authenticated | checking | not-authenticated
    profileState: 'finished',
    user: {},
    options: [],
  },
  reducers: {
    onCheckingAuth: (state) => {
      state.authState = 'checking';
      state.user = {};
    },
    onLogin: (state, { payload }) => {
      state.authState = 'authenticated',
      state.user = payload
    },
    onErrorAuth: (state) => {
      state.user = {};
    },
    onLogoutUser: (state) => {
      state.authState = 'not-authenticated';
      state.user = {};
      state.options = [];
    },
    onSetOptions: (state, { payload }) => {
      state.options = payload
    },
    onSetUser: (state, { payload }) => {
      state.authState = 'authenticated'
      state.user = payload;
    },
    onStartLogin: (state) => {
      state.authState = 'not-authenticated'
    },
    onStartRegister: (state) => {
      state.authState = 'register';
    },
    onStartRecovery: (state) => {
      state.authState = 'recovery';
    },
    onSubmitRecovery: (state) => {
      state.authState = 'sent';
    },
    onCheckingRecovery: (state) => {
      state.authState = 'checking';
    },
    onErrorRecovery: (state) => {
      state.authState = 'not-sent';
    },
    onSetNewProfile: (state, { payload }) => {
      state.profileState = 'finished';
      state.user = payload;
    },
    onLoadProfile: (state) => {
      state.profileState = 'loading';
    },
    onSetLoadedProfile: (state) => {
      state.profileState = 'finished';
    }
  }
});

export const {
  onCheckingAuth,
  onLogin,
  onErrorAuth,
  onLogoutUser,
  onSetOptions,
  onStartLogin,
  onStartRecovery,
  onStartRegister,
  onSubmitRecovery,
  onCheckingRecovery,
  onErrorRecovery,
  onSetUser,
  onLoadProfile,
  onSetNewProfile,
  onSetLoadedProfile
} = authSlice.actions;