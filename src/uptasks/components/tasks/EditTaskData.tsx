import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useUpTasks } from '../../../hooks';
import { EditTaskModal } from './EditTaskModal';


export const EditTaskData = () => {

  const params = useParams();
  const projectId = params.projectId!

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('editTask')!;

  const { getTaskById } = useUpTasks();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    retry: false,
    //Si hay tarea, se ejecuta el query
    enabled: !!taskId,
  });

  if (isLoading) return 'Cargando...';
  if (isError) return <Navigate to='/404' />

  if (data) return (<EditTaskModal task={data} projectId={projectId} taskId={taskId}/>)
}
