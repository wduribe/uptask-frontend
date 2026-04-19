import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from 'react-hook-form';
import { UserLogin } from '../../types';
import { ErrorMessage } from '../../uptasks/components';
import { Link, useNavigate } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../../model/routes';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useState } from 'react';

const initialValues: UserLogin = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const [btnDisabled, setbtnDisabled] = useState<boolean>(false);


  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      setbtnDisabled(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setbtnDisabled(false);
      toast.success(data);
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`);  
    }
  });

  const handleLogin = (formData: UserLogin) => {
    setbtnDisabled(true);
    mutate(formData);
  }

  return (
    <AuthLayout>

      <h1 className="mb-5 text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-2xl font-light text-white mb-5">
        Comienza a planear tus proyectos {''}
        <span className=" text-fuchsia-500 font-bold"> iniciando sesión en este formulario</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
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

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          disabled={btnDisabled}
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 disabled:bg-fuchsia-600 disabled:cursor-not-allowed hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className='mt-10 flex flex-col space-y-4'>
        <Link
          className='text-center text-gray-300 font-normal'
          to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.REGISTER}`}
        >¿No tienes cuenta? Crear una</Link>

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