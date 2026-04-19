import { isAxiosError } from 'axios';
import { UpdateCurrentPasswordForm, UserProfileForm } from '../types';
import { apiUpTasks } from '../api/api';

type ProfileAPIType = {
    formDataProfile: UserProfileForm,
    formDataUpdatePassword: UpdateCurrentPasswordForm,
}


export const useProfile = () => {

    const updateProfile = async ({ formDataProfile }: Pick<ProfileAPIType, 'formDataProfile'>) => {
        try {
            const { data } = await apiUpTasks.put(`/auth/profile`, formDataProfile);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const updatePassword = async ({ formDataUpdatePassword }: Pick<ProfileAPIType, 'formDataUpdatePassword'>) => {
        try {
            const { data } = await apiUpTasks.put(`/auth/update-password`, {
                currentPassword: formDataUpdatePassword.current_password,
                newPassword: formDataUpdatePassword.password,
            });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    return {
        updateProfile,
        updatePassword,
    }

}

