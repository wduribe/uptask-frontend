import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../../model/routes';
import { useCheckAuth } from '../../hooks/useCheckAuth';


export const GuardPublicPages = () => {

    const { isLoading, isError } = useCheckAuth();

    if (isLoading) return 'Cargando...';

    if (isError) {
        return <Outlet />
    }

    return <Navigate replace to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`} />

}
