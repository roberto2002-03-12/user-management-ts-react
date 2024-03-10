import { configureStore } from '@reduxjs/toolkit';
import { authSlice, userManagementSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userManagement: userManagementSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});