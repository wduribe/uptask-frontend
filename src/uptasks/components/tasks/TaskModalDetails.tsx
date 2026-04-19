import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUpTasks } from '../../../hooks';
import { Project, TaskStatus } from '../../../types';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../../model/routes';
import { formatDate } from '../../../utils/utils';
import { statusTranslations } from '../../../locales/es';
import { toast } from 'react-toastify';
import { NotesPanel } from '../notes/NotesPanel';

interface TaskModalDetailsProps {
    projectId: Project['_id'],
}

export const TaskModalDetails = ({ projectId }: TaskModalDetailsProps) => {

    const { getTaskById, updateStatus } = useUpTasks();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const viewTask = queryParams.get('viewTask');
    const showModal: boolean = viewTask ? true : false;

    const { isLoading, isError, data } = useQuery({
        queryKey: ['task', viewTask],
        queryFn: () => getTaskById({ projectId, taskId: viewTask! }),
        retry: false,
        enabled: !!viewTask,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task', viewTask] });
            toast.success(data);
            //navigate(location.pathname, { replace: true });
        }
    });

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = event.target.value as TaskStatus;
        mutate({ projectId, taskId: viewTask!, status })
    }

    if (isLoading) return 'Cargando...';

    if (isError) {
        //toast.error(error.message , {toastId: 'error'});
        return <Navigate to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PROJECT_DETAILS}/${projectId}`} />;
    }

    if (data) return (
        <>
            <Transition appear show={showModal} as={Fragment}>
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
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)} </p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                                    <div className='my-5 space-y-3'>
                                        {
                                            data.completedBy.length ?
                                                <>
                                                    <p className='font-bold text-2xl text-slate-600 my-5'>Historial de cambios</p>

                                                    <ul className=' list-decimal'>
                                                        {
                                                            data.completedBy.map((activityLog) => (
                                                                <li key={activityLog._id}>
                                                                    <span className='font-bold text-slate-600'>
                                                                        {statusTranslations[activityLog.status]}:
                                                                    </span>
                                                                    {' '}
                                                                    {activityLog.user.name}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>

                                                </>
                                                :
                                                null

                                        }
                                        <div className='my-2 space-y-3'>
                                            <label className='font-bold'>Estado Actual: </label>
                                            <select
                                                defaultValue={data.status}
                                                className='w-full p-3 bg-white border border-gray-300'
                                                onChange={onChange}
                                            >
                                                {Object.entries(statusTranslations).map(([key, value]) => (
                                                    <option key={key} value={key}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <NotesPanel notes={data.notes} />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}