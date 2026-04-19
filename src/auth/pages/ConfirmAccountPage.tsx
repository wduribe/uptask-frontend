import { Link } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { PublicRoutes } from '../../model/routes';


export const ConfirmAccountPage = () => {

    const  [token, setToken] = useState<string>('');

    const {confirmAccount} = useAuth();

    const {mutate} = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);                
        }
    });

    const handleChange = (token: string) => {
        setToken(token);
    }

    const handleComplete = (token: string) => mutate(token);

    return (
        <AuthLayout>
            <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        <PinInputField className='w-10 h-10 p-3 rounded-lg border-green-600 border placeholder-white' />
                        <PinInputField className='w-10 h-10 p-3 rounded-lg border-green-600 border placeholder-white' />
                        <PinInputField className='w-10 h-10 p-3 rounded-lg border-green-600 border placeholder-white' />
                        <PinInputField className='w-10 h-10 p-3 rounded-lg border-green-600 border placeholder-white' />
                        <PinInputField className='w-10 h-10 p-3 rounded-lg border-green-600 border placeholder-white' />
                        <PinInputField className='w-10 h-10 p-3 rounded-lg border-green-600 border placeholder-white' />

                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4" >
                <Link
                    to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.REQUEST_CODE}`}
                    className="mt-5 text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>


        </AuthLayout>
    )
}