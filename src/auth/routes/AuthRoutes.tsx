import { Route } from 'react-router-dom';
import { RouteNotFound } from '../../router/RouteNotFound';
import { PublicRoutes } from '../../model/routes';
import { ConfirmAccountPage, ForgotPasswordPage, LoginPage, NewPasswordPage, RegisterPage, RequestNewCodePage } from '../pages';

export const AuthRoutes = () => {
  return (
    <RouteNotFound>
        <Route path={PublicRoutes.LOGIN} element={<LoginPage/>}/>
        <Route path={PublicRoutes.REGISTER} element={<RegisterPage/>}/>
        <Route path={PublicRoutes.CONFIRM_ACCOUNT} element={<ConfirmAccountPage/>}/>
        <Route path={PublicRoutes.REQUEST_CODE} element={<RequestNewCodePage/>}/>
        <Route path={PublicRoutes.FORGOT_PASSWORD} element={<ForgotPasswordPage/>}/>
        <Route path={PublicRoutes.SET_NEW_PASSWORD} element={<NewPasswordPage/>}/>
    </RouteNotFound>
  );
}
