import { AuthLayout } from '../layout/AuthLayout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserRequest } from "../../types";
import { ErrorMessage } from '../../uptasks/components';
import { PublicRoutes } from '../../model/routes';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useState } from 'react';

const initialValues: UserRequest = {
    email: ''
}

export const RequestNewCodePage = () => {

    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

    const {getNewCode} = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: getNewCode,
        onError: (error) => {
            setBtnDisabled(false);
            toast.error(error.message);
        },
        onSuccess: (data) => {
            reset();
            setBtnDisabled(false);
            toast.success(data);
        },
    });

    const handleRequestCode = (formData: UserRequest) => { 
        setBtnDisabled(true);
        mutate(formData);
    }

    return (
        <AuthLayout>
            <h1 className="text-5xl font-black text-white">Solicitar Código de Confirmación</h1>
            <p className="text-2xl font-light text-white mt-5">
                Coloca tu e-mail para recibir {''}
                <span className=" text-fuchsia-500 font-bold"> un nuevo código</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
                        className="w-full p-3 rounded-lg border-gray-300 border"
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
                    value='Enviar Código'
                    className="bg-fuchsia-600 disabled:bg-fuchsia-600 disabled:cursor-not-allowed hover:bg-fuchsia-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
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
                    to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.FORGOT_PASSWORD}`}
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </AuthLayout>
    )
}