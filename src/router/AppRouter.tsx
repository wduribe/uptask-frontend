import { Navigate, Route } from 'react-router-dom';
import { RouteNotFound } from './RouteNotFound';
import { GuardPublicPages } from '../auth/guard/GuardPublicPages';
import { PrivateRoutes, PublicRoutes } from '../model/routes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { GuardPrivatePages } from '../uptasks/guard/GuardPrivatePages';
import { UptaskRoutes } from '../uptasks/routes/UptaskRoutes';
 

export const AppRouter = () => {
	return ( 
		<RouteNotFound>
			<Route element={<GuardPublicPages/>}>
				<Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE}/>}/>
				<Route path={`${PublicRoutes.PUBLIC}/*`} element={<AuthRoutes/>}/>	
			</Route>
			<Route element={<GuardPrivatePages/>}>
				<Route path={`${PrivateRoutes.PRIVATE}/*`} element={<UptaskRoutes/>}/>
			</Route>
		</RouteNotFound>
	)
}
