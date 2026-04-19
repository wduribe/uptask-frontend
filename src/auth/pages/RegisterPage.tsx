import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from "react-hook-form";
import { UserRegister } from '../../types';
import { ErrorMessage } from '../../uptasks/components';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../model/routes';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useState } from 'react';

const initialValues: UserRegister = {
  name: '',
  email: '',
  password: '',
}

export const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserRegister>({ defaultValues: initialValues });
  const [btnDisabled, setbtnDisabled] = useState<boolean>(false);

  const { createAccount } = useAuth();

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      setbtnDisabled(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setbtnDisabled(false); 
      reset(); 
      toast.success(data);
    }
  });

  const handleRegister = (formData: UserRegister) => {
    setbtnDisabled(true);
    mutate(formData)
    
  };

  return (
    <AuthLayout>
      <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
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

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
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
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <input
          disabled={btnDisabled}
          type="submit"
          value='Registrarme'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer disabled:bg-fuchsia-600 disabled:cursor-not-allowed"
        />
      </form>
      <nav className='mt-10 flex flex-col space-y-4'>
        <Link
          className='text-center text-gray-300 font-normal'
          to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`}
        >¿Ya tienes cuenta? Iniciar sección</Link>
      </nav>
    </AuthLayout>
  )
}