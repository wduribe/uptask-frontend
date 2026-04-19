import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TaskForm } from './TaskForm';
import { useForm } from 'react-hook-form';
import { TaskFormData } from '../../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUpTasks } from '../../../hooks';
import { toast } from 'react-toastify';

const initialValues: TaskFormData = {
    name: '',
    description: '',
}

export const AddTaskModal = () => {

    const [disabled, setDisabled] = useState<boolean>(false);

    const navigate = useNavigate();
 
    /*Leyendo si existe el modal*/
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const show = modalTask ? true : false;

    /*Leyendo los params de la url*/
    const params = useParams();

    const { createTask } = useUpTasks();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            setDisabled(false);
            toast.error(error.message);
        },
        onSuccess: (data) => {
            setDisabled(false);
            reset();
            queryClient.invalidateQueries({ queryKey: ["project", params.projectId] })
            navigate(location.pathname, { replace: true });
            toast.success(data);
        }
    });

    const onCreateTask = (formData: TaskFormData) => {
        setDisabled(true);

        const task = {
            projectId: params.projectId!,
            taskFormData:formData,
        }
        mutate(task);

    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form
                                        onSubmit={handleSubmit(onCreateTask)}
                                        className='mt-5'
                                        noValidate
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />
                                        <button
                                            className='mt-5 bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors disabled:opacity-60'
                                            disabled={disabled}
                                        >
                                            Crear Tarea
                                        </button>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}