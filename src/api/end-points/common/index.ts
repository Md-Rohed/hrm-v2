import { apiClient } from "@/service/apiClient";

export const getAllCompanyDetails = () => {
    return apiClient({
        url: `/company/all`,
        method: 'GET',
    });
}