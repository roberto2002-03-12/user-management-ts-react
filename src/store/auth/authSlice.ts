import { createSlice } from '@reduxjs/toolkit';

// type TypeEmailState = 'sent' | 'in-process' | 'not-sent';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authState: 'not-authenticated', // authenticated | checking | not-authenticated
    profileState: 'finished',
    user: {},
    authMessage: '',
    options: [],
  },
  reducers: {
    onCheckingAuth: (state) => {
      state.authState = 'checking';
      state.user = {};
      state.authMessage = '';
    },
    onLogin: (state, { payload }) => {
      state.authState = 'authenticated',
      state.user = payload
    },
    onErrorAuth: (state, { payload }) => {
      state.authMessage = 'not-authenticated',
      state.user = {},
      state.authMessage = payload
    },
    onLogoutUser: (state) => {
      state.authState = 'not-authenticated';
      state.user = {};
      state.authMessage = '';
      state.options = [];
    },
    onClearMessage: (state) => {
      state.authMessage = ''
    },
    onRegister: (state, { payload }) => {
      state.authState = 'not-authenticated';
      state.user = {};
      state.authMessage = payload;
    },
    onSetOptions: (state, { payload }) => {
      state.options = payload
    },
    onSetUser: (state, { payload }) => {
      state.authState = 'authenticated'
      state.user = payload;
    },
    onStartRecovery: (state) => {
      state.authState = 'recovery';
    },
    onResetRecovery: (state) => {
      state.authState = 'not-authenticated'
    },
    onSubmitRecovery: (state) => {
      state.authState = 'sent';
    },
    onCheckingRecovery: (state) => {
      state.authState = 'checking';
      state.authMessage = '';
    },
    onErrorRecovery: (state, { payload }) => {
      state.authState = 'not-sent';
      state.authMessage = payload;
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
  onClearMessage,
  onRegister,
  onSetOptions,
  onStartRecovery,
  onResetRecovery,
  onSubmitRecovery,
  onCheckingRecovery,
  onErrorRecovery,
  onSetUser,
  onLoadProfile,
  onSetNewProfile,
  onSetLoadedProfile
} = authSlice.actions;