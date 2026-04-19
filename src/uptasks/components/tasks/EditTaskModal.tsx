import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Project, Task, TaskFormData } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from './TaskForm';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUpTasks } from '../../../hooks';
import { toast } from 'react-toastify';

interface EditTaskModalProps {
    task: TaskFormData, 
    taskId: Task['_id'],
    projectId: Project['_id'],
}



export const EditTaskModal = ({task, taskId, projectId}: EditTaskModalProps) => {

    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const {register, formState: {errors}, handleSubmit, reset} = useForm<TaskFormData>({defaultValues: task});

    const navigate = useNavigate();

    const {editTask} = useUpTasks();
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: editTask,
        onError: (error) => {
            toast.error(error.message);
            setDisableBtn(false);
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
            queryClient.invalidateQueries({queryKey: ['task', taskId]});
            toast.success(data);
            setDisableBtn(false);
            navigate(location.pathname, {replace: true});
            reset();
        }
    })

    const handleForm = (formData: TaskFormData) => {
        const data = {
            projectId,
            taskId, 
            taskFormData: formData,
        }
        setDisableBtn(true);
        mutate(data);
        
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                    Editar Tarea
                                </DialogTitle>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    noValidate
                                    onSubmit={handleSubmit(handleForm)}
                                >
                               <TaskForm
                               errors={errors}
                                register={register}
                               />
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer disabled:opacity-75"
                                        value='Guardar Tarea'
                                        disabled={disableBtn}
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}