import axios, { AxiosInstance, AxiosResponse } from "axios";
import isAuth from "@/utils/isAuth";

type LogoutFunction = () => void;

let globalLogoutFunction: LogoutFunction | null = null;

export const setGlobalLogoutFunction = (logoutFn: LogoutFunction): void => {
    globalLogoutFunction = logoutFn;
};

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const { isValid, accessToken } = await isAuth();
            if (isValid && accessToken) {

                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.error("Error in request interceptor:", error);
        }
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized - Clearing storage");
            if (globalLogoutFunction) {
                globalLogoutFunction();
            }
        }
        return Promise.reject(error);
    }
);

export { apiClient };
