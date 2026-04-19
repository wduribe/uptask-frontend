import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../model/routes';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

interface NewPasswordTokenProps {
    token: string,
    setToken: (value: string) => void,
    setIsValidToken: (value: boolean) => void,
}
 
export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {

    const { validateToken } = useAuth();

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message);
            setIsValidToken(false);
        },
        onSuccess: (data) => {
            toast.success(data);
            setIsValidToken(true);
        }
    });

    const handleChange = (token: string) => setToken(token);
    const handleComplete = (token: string) => mutate(token);

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.FORGOT_PASSWORD}`}
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}