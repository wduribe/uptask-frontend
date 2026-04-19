import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ForgotPasswordForm } from '../../types';
import { ErrorMessage } from '../../uptasks/components';
import { PublicRoutes } from '../../model/routes';
import { AuthLayout } from '../layout/AuthLayout';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useState } from 'react';

const initialValues: ForgotPasswordForm = {
    email: ''
}

export const ForgotPasswordPage = () => {

    const [btnDisabled, setBtnDisabled] = useState<boolean>();

    const { forgotPassword } = useAuth();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            setBtnDisabled(false);
            toast.error(error.message);
        },
        onSuccess: (data) => {
            setBtnDisabled(false);
            toast.success(data);
        }
    });

    const handleForgotPassword = (formData: ForgotPasswordForm) => {
        setBtnDisabled(true);
        mutate(formData);
        reset();
    }


    return (
        <AuthLayout>

            <h1 className="mb-5 text-5xl font-black text-white">Recuperar contraseña</h1>
            <p className="text-2xl font-light text-white mb-5">
                Ingresa email para {''}
                <span className=" text-fuchsia-500 font-bold"> recuperar contraseña</span>
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10  bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    disabled={btnDisabled}
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer disabled:bg-fuchsia-600 disabled:cursor-not-allowed"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`}
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.REGISTER}`}
                    className="text-center text-gray-300 font-normal"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </AuthLayout>
    )
}