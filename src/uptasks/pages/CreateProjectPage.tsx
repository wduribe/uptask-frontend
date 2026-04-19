import { Link, useNavigate } from 'react-router-dom';
import { UpTaskLayout } from '../layout/UpTaskLayout';
import { PrivateRoutes } from '../../model/routes';
import { useForm } from 'react-hook-form';
import { ProjectForm } from '../components/projects/ProjectForm';
import { ProjectFormData } from '../../types';
import { useUpTasks } from '../../hooks';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const initialFormValue: ProjectFormData = {
  projectName: '',
  clientName: '',
  description: '',
}

export const CreateProjectPage = () => {

  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialFormValue });
  const { createProject } = useUpTasks();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => { 
      toast.error(error.message);
      setDisableBtn(false);
    },
    onSuccess: (data) => {
      toast.success(data);
      setDisableBtn(false);
      navigate('/');
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    setDisableBtn(true);
    mutate(formData);
  };

  return (
    <UpTaskLayout>
      <section className='max-w-full w-[1250px] flex justify-center max-[420px]:p-0'>
        <div className='flex max-[768px]:flex-col gap-5'>
          <div className='px-5 max-[420px]:p-2'>
            <h1 className='text-5xl font-black'>Crear Proyectos</h1>
            <p className='text-2xl font-light text-gray-500 mt-5'>Llena el siguiente formulario para crear un proyecto</p>
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
               value="Crear Proyecto"
              className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-wrap uppercase font-bold 
              cursor-pointer transition-colors text-white disabled:opacity-40'
              disabled={disableBtn}
            />

          </form>

        </div>
      </section>
    </UpTaskLayout>
  )
}
