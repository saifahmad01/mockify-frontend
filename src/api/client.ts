import axios from 'axios';
import type { ApiError } from './types';
import { tokenStore } from './token';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // Cookies are sent with every request
});

// Request interceptor to add Authorization header
apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh-token interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/logout');

    // If the request is to an auth route or the error is not 401, reject it
    if (isAuthRoute || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    let refreshPromise = tokenStore.getRefreshPromise();

    // If there's no ongoing refresh, start one
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const res = await apiClient.post('/auth/refresh');
        tokenStore.set(res.data.access_token);
        return res.data.access_token;
      })();

      tokenStore.setRefreshPromise(refreshPromise);
    }

    // Wait for the refresh to complete
    try {
      const newToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch {
      tokenStore.clear();
      return Promise.reject(error);
    } finally {
      tokenStore.setRefreshPromise(null);
    }
  },
);

// Helper: to display error messages
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError | undefined;

    if (apiError?.validationErrors) {
      return Object.values(apiError.validationErrors).flat().join(', ');
    }

    return apiError?.message || error.message || 'An unexpected error occurred';
  }

  return 'An unexpected error occurred';
};
