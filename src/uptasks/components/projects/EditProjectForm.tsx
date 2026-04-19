import { Link, useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../../model/routes';
import { ProjectForm } from './ProjectForm';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectFormData } from '../../../types';
import { useUpTasks } from '../../../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface EditProjectFormProps {
	project: ProjectFormData,
	projectId: string,
} 

export const EditProjectForm = ({ project, projectId }: EditProjectFormProps) => {

	const [disableBtn, setDisableBtn] = useState<boolean>(false);
	const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: project });

	const { editProject } = useUpTasks();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: editProject,
		onError: (error) => {
			toast.error(error.message);
			setDisableBtn(false);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			queryClient.invalidateQueries({ queryKey: ["project", projectId] });
			toast.success(data);
			setDisableBtn(false);
			navigate('/');
		}
	});

	const handleForm = (formData: ProjectFormData) => {
		setDisableBtn(true);
		const data = { projectId, projectFormData: formData  }
		mutate(data);
	};

	return (
		<>
			<div className='flex max-[768px]:flex-col gap-5'>
				<div className='px-5 max-[420px]:p-2'>
					<h1 className='text-5xl font-black'>Editar Proyecto</h1>
					<p className='text-2xl font-light text-gray-500 mt-5'>Llena el siguiente formulario para editar el proyecto</p>
					<nav className='my-5'>
						<Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`} className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'>Volver a proyectos</Link>
					</nav>
				</div>
				<form
					className='p-8 bg-white shadow-lg rounded-lg max-[420px]:p-2'
					onSubmit={handleSubmit(handleForm)}
					noValidate
				>
					<ProjectForm
						register={register}
						errors={errors}
					/>
					<input
						type="submit"
						value="Guardar Cambios"
						className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-wrap uppercase font-bold 
              			cursor-pointer transition-colors text-white disabled:opacity-40'
						disabled={disableBtn}
					/>

				</form>

			</div>
		</>
	)
}
