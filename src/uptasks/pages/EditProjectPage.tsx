import { Navigate, useParams } from 'react-router-dom';
import { UpTaskLayout } from '../layout/UpTaskLayout';
import { useQuery } from '@tanstack/react-query';
import { useUpTasks } from '../../hooks';
import { EditProjectForm } from '../components/projects/EditProjectForm';

export const EditProjectPage = () => {

  const params = useParams();
  const projectId = params.projectId!;

  const { getProjectById } = useUpTasks();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false, 
  });
 
  if (isLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to="/404" />

  return (
    <UpTaskLayout>
      <section className='max-w-screen-2xl flex justify-center max-[420px]:p-0'>
        <EditProjectForm project={data!} projectId={projectId}/>
      </section>
    </UpTaskLayout>
  );
}
