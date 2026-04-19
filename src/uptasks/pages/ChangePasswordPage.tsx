import { SectionUserLayout } from '../layout/SectionUserLayout';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../components';
import { UpdateCurrentPasswordForm } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { useProfile } from '../../hooks/useProfile';
import { toast } from 'react-toastify';

const initialValues: UpdateCurrentPasswordForm = {
    current_password: '',
    password: '',
}

export const ChangePasswordPage = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })
    const { updatePassword } = useProfile();
    const {mutate} = useMutation({
        mutationFn: updatePassword,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            reset();
            toast.success(data);
        }
    });

    const handleChangePassword = (formData: UpdateCurrentPasswordForm) => mutate({formDataUpdatePassword: formData});

    return (
        <SectionUserLayout>
            <div className="mx-auto max-w-3xl">

                <h1 className="text-5xl font-black ">Cambiar Contraseña</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu contraseña</p>

                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="current_password"
                        >Contraseña Actual</label>
                        <input
                            id="current_password"
                            type="password"
                            placeholder="Contraseña Actual"
                            className="w-full p-3  border border-gray-200"
                            {...register("current_password", {
                                required: "La contraseña actual es obligatoria",
                            })}
                        />
                        {errors.current_password && (
                            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >Nueva Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nueva Contraseña"
                            className="w-full p-3  border border-gray-200"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: 'La contraseña debe ser mínimo de 8 caracteres'
                                }
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Cambiar Contraseña'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </SectionUserLayout>
    )
}