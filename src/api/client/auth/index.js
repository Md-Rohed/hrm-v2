import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { LoginApi } from "@/api/end-points/auth";

// --- Define your types ---
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginData {
    token: string;
    user: { id: string; name: string };
}

export interface LoginResponse {
    status: number;
    data: LoginData;
    message: string;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}

// Normalized payloads that your hook emits to caller
export interface SuccessPayload {
    status: number;
    data: LoginData;
    message: string;
}

export interface ErrorPayload {
    message: string;
    errors?: Record<string, string[]>;
}

type Options = {
    onSuccess?: (res: SuccessPayload) => void;
    onError?: (err: ErrorPayload) => void;
};

export const useLoginMutation = (useQueryOptions?: Options) => {
    const { onSuccess = () => { }, onError = () => { } } = useQueryOptions || {};

    return useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
        // LoginApi itself returns LoginResponse
        mutationFn: (vars) => LoginApi(vars),

        onSuccess: (res) => {
            console.log("LoginApi response:", res);
            onSuccess({
                status: res.status,
                data: res.data,
                message: res.message,
            });
        },

        onError: (error) => {
            const apiErr = error.response?.data;
            onError({
                errors: apiErr?.errors,
                message: apiErr?.message ?? "Unknown error",
            });
        },
    });
};



