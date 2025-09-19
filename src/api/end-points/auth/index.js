import { apiClient } from "@/service/apiClient";
import { LoginRequest } from "@/types/api/auth";


export const LoginApi = (data: LoginRequest) => {
  return apiClient({
    url: `/account/signin`,
    method: 'POST',
    data,
  });
};