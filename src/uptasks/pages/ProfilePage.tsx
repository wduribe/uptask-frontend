import { useCheckAuth } from '../../hooks/useCheckAuth';
import { ProfileForm } from '../components/profile/ProfileForm';
import { SectionUserLayout } from '../layout/SectionUserLayout';

export const ProfilePage = () => {

    const { data, isLoading } = useCheckAuth();

    if(isLoading) return 'Cargando...';

    if(data) return (
        <SectionUserLayout>
            <ProfileForm data={data}/>
        </SectionUserLayout>
    )
}
