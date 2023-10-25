import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_HOST } from '../constants/api-url';
import { TOKEN_JWT_LS } from '../constants/auth';

export const api: AxiosInstance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_JWT_LS);

  if (token && config && config.headers) {
    config.headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
  }

  return config;
});
