import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { API_HOST } from '../constants/api-url';
import { TOKEN_JWT_LS } from '../constants/auth';

export const api: AxiosInstance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_JWT_LS);

  const newConfig = { ...config };

  if (token && newConfig && newConfig.headers) {
    newConfig.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  return newConfig;
});
