import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { UpTaskLayout } from '../layout/UpTaskLayout';
import { useQuery } from '@tanstack/react-query';
import { useUpTasks } from '../../hooks';
import { AddTaskModal, EditTaskData, TaskList } from '../components';
import { TaskModalDetails } from '../components/tasks/TaskModalDetails';
import { PrivateRoutes } from '../../model/routes';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { isManager } from '../../utils/policies';
import { useMemo } from 'react';

export const ProjectDetailsPage = () => {

	const { getFullProject } = useUpTasks();
	const { data: dataUser, isLoading: authLoading } = useCheckAuth();

	const params = useParams();
	const projectId = params.projectId!;
	const navigate = useNavigate();

	const { data, isLoading, isError } = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getFullProject(projectId),
		retry: false,
	});

	const canEdit = useMemo(() => data?.manager.toString() === dataUser?._id.toString(), [data, dataUser]);

	if (isLoading && authLoading) return 'Cargando...';
	if (isError) return <Navigate to='/404' />

	if (data && dataUser) return (
		<UpTaskLayout>
			<section className='flex justify-center max-[420px]:p-0'>
				<div className="max-w-full w-[1250px]">
					<h2 className='md:text-5xl font-black text-4xl'>{data.projectName}</h2>
					<p className='text-2xl font-light text-gray-500 mt-5'>{data.description}</p>
					{
						(isManager(data.manager, dataUser._id)) &&
						<>
							<nav className='my-5 flex gap-3'>
								<button
									type='button'
									className='bg-fuchsia-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
									onClick={() => navigate('?newTask=true')}
								>
									Agregar Tarea
								</button>
								<Link
									className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
									to={`${PrivateRoutes.PROJECT_TEAM}`}>
									Colaboradores
								</Link>
							</nav>

						</>
					}
					<TaskList
						canEdit={canEdit}
						tasks={data.tasks}
					/>
					<AddTaskModal />
					<EditTaskData />
					<TaskModalDetails projectId={projectId} />

				</div>
			</section>
		</UpTaskLayout>
	)
}
