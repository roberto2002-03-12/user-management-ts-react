import axios from 'axios';

// Función para verificar si una URL es válida
function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

const userManagementApi = axios.create({
  baseURL: import.meta.env.VITE_USERMANAGEMENT_API
});

userManagementApi.interceptors.request.use((config) => {
  if (!isValidURL(config.baseURL ?? '')) throw new Error('invalid url');

  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default userManagementApi;