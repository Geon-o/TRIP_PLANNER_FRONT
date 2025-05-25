import axios, {AxiosInstance} from "axios";
import {useAuthStore} from "@pages/user/sign_in/store/useAuthStore.tsx";

const Api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
  // baseURL: 'http://localhost:9999',
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

Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await Api.post(
                    '/auth/reIssuanceToken',
                    null,
                    { withCredentials: true }
                );

                const newToken = res.data.newAccessToken;
                useAuthStore.getState().setAccessToken(newToken);
                useAuthStore.persist.rehydrate();

                // 새 토큰으로 Authorization 헤더 덮어쓰기
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axios(originalRequest); // 요청 재시도
            } catch (err) {
                useAuthStore.getState().clearAccessToken();
                window.location.href = '/signIn';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default Api;