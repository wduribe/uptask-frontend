import { Navigate, Route } from 'react-router-dom';
import { RouteNotFound } from '../../router/RouteNotFound';
import { PrivateRoutes } from '../../model/routes';
import { CreateProjectPage, DashboardPage, EditProjectPage, ProjectDetailsPage, ProjectTeamPage } from '../pages';
import { ProfilePage } from '../pages/ProfilePage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';

export const UptaskRoutes = () => {
  return ( 
    <RouteNotFound>
        <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD}/>}/>
        <Route path={PrivateRoutes.DASHBOARD} element={<DashboardPage/>}/>
        <Route path={`${PrivateRoutes.CREATE_PROJECT}`} element={<CreateProjectPage/>}/>
        <Route path={`${PrivateRoutes.PROJECT_DETAILS}/:projectId`} element={<ProjectDetailsPage/>}/>
        <Route path={`${PrivateRoutes.EDIT_PROJECT}/:projectId`} element={<EditProjectPage/>}/>
        <Route path={`${PrivateRoutes.PROJECT_DETAILS}/:projectId/${PrivateRoutes.PROJECT_TEAM}`} element={<ProjectTeamPage/>}/>
        <Route path={`${PrivateRoutes.PROFILE}`} element={<ProfilePage/>}/>
        <Route path={`${PrivateRoutes.UPDATE_PASSWORD}`} element={<ChangePasswordPage/>}/>
    </RouteNotFound>
  ) 
}
 

// /:projectId/team