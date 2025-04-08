import axios, {AxiosInstance} from "axios";

const Api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default Api;