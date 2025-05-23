import axios, {AxiosInstance} from "axios";
import {useAuthStore} from "@pages/user/sign_in/store/useAuthStore.tsx";
import {persist} from "zustand/middleware";

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

Api.interceptors.request.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await axios.post('/auth/reIssuanceToken');
        console.log(res);
        const newToken = res.authToken;

        useAuthStore.getState().setAccessToken(newToken);
        useAuthStore.persist.rehydrate();

      } catch (error) {
        alert('세션이 만료됐습니다. \n다시 로그인해주세요.');
        useAuthStore.getState().clearAccessToken();
        window.location.href = '/signIn';
      }
    }
  }
)

export default Api;