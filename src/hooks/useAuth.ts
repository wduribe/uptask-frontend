import { isAxiosError } from 'axios';
import { apiUpTasks } from '../api/api';
import { CheckPasswordForm, ForgotPasswordForm, User, UserLogin, UserRegister, UserRequest } from '../types';

export const useAuth = () => {

    const createAccount = async (formData: UserRegister) => {
        try {
            const { data } = await apiUpTasks.post<string>('/auth/register', formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const login = async (formData: UserLogin) => {
        try {
            const { data } = await apiUpTasks.post<{ [key: string]: any }>('/auth/login', formData);
            localStorage.setItem('token', data.token);
            return 'Usuario autenticado correctamente';
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const confirmAccount = async (token: string) => {
        try {
            const { data } = await apiUpTasks.post<string>('/auth/confirm-account', { token });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const getNewCode = async ({ email }: UserRequest) => {
        try {
            const { data } = await apiUpTasks.post<string>('/auth/request-code', { email });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const forgotPassword = async ({ email }: ForgotPasswordForm) => {
        try {
            const { data } = await apiUpTasks.post<string>('/auth/forgot-password', { email });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const validateToken = async (token: string) => {
        try {
            const { data } = await apiUpTasks.post<string>('/auth/validate-token', { token });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const editPassword = async ({ token, newPassword }: { token: string, newPassword: string }) => {

        try {
            const { data } = await apiUpTasks.post<string>(`/auth/update-password/${token}`, { newPassword });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const getUserAuthenticated = async () => {
        try {
            const {data} = await apiUpTasks<User>('/auth/user');
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const confirmPassword = async ({password}: CheckPasswordForm) => {
        try {
            const {data} = await apiUpTasks.post('/auth/check-password', {password});
            return data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    return {

        //*Methods
        createAccount,
        login,
        confirmAccount,
        getNewCode,
        forgotPassword,
        validateToken,
        editPassword,
        getUserAuthenticated,
        confirmPassword,
    }

}