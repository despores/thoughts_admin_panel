import axios from "axios";

export interface User {
    id: number;
    email: string;
    name: string;
    role: "admin" | "moderator";
    createdAt: string;
    lastLogin: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
    role?: "admin" | "moderator";
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirm {
    token: string;
    newPassword: string;
}

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const authApi = {    
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
        return response.data;
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axios.post(`${API_URL}/auth/logout`);
        localStorage.removeItem("token");
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await axios.get<User>(`${API_URL}/auth/me`);
        return response.data;
    },

    requestPasswordReset: async (data: PasswordResetRequest): Promise<{ message: string }> => {
        const response = await axios.post<{ message: string }>(`${API_URL}/auth/reset-password`, data);
        return response.data;
    },

    confirmPasswordReset: async (data: PasswordResetConfirm): Promise<{ message: string }> => {
        const response = await axios.post<{ message: string }>(`${API_URL}/auth/reset-password-confirm`, data);
        return response.data;
    },

    refreshToken: async (): Promise<{ token: string }> => {
        const response = await axios.post<{ token: string }>(`${API_URL}/auth/refresh`);
        return response.data;
    },

    setupAxiosInterceptors: (token: string) => {
        axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const { token } = await authApi.refreshToken();
                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }
};
