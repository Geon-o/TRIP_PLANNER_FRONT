import axios, {AxiosInstance} from "axios";
import {useAuthStore} from "@pages/user/sign_in/store/useAuthStore.tsx";

const Api: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
  baseURL: 'http://localhost:9999',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

Api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default Api;