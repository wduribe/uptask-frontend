import { useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import NewPasswordToken from '../components/NewPasswordToken';
import { NewPasswordForm } from '../components/NewPasswordForm';


export const NewPasswordPage = () => {
    
    const [token, setToken] = useState<string>('');
    const [isValidToken, setIsValidToken] = useState<boolean>(false);
    
    return (
        <AuthLayout>
            <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el codigo que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por email</span>
            </p>
            {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>: <NewPasswordForm token={token}/>}
        </AuthLayout>
    )
}
