import axios from 'axios';

const userManagementApi = axios.create({
  baseURL: import.meta.env.VITE_USERMANAGEMENT_API
});

userManagementApi.interceptors.request.use((config) => {

  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config;
});

export default userManagementApi;