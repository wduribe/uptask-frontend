import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from '../../model/routes';
import { useCheckAuth } from '../../hooks/useCheckAuth';


export const GuardPrivatePages = () => {

	const {isLoading, isError } = useCheckAuth();
	
	if (isLoading) return 'Cargando...';
	
	if(isError){
		return <Navigate to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`}/>
	}

	return <Outlet />

}
