import { configureStore } from '@reduxjs/toolkit';
import { authSlice, userManagementSlice, catSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userManagement: userManagementSlice.reducer,
    cat: catSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});