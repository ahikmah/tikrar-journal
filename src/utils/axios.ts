import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { checkRefreshToken } from './auth';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      window.location.pathname !== '/auth/reset-password/' &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const token = await checkRefreshToken();

        if (!token) {
          throw new Error('Refresh token not found');
        }
        const response = await axiosInstance.post(endpoints.auth.refresh, {
          refresh_token: token,
        });

        localStorage.setItem('accessToken', response.data.data.access_token);
        localStorage.setItem('refreshToken', response.data.data.refresh_token);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.data.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${response.data.data.access_token}`;

        isRefreshing = false;

        return await axiosInstance(originalRequest);
      } catch (e) {
        console.error(e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('@ud');

        window.location.href = paths.auth.jwt.signIn;
      }
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
    refresh: '/api/auth/refresh',
  },
};
