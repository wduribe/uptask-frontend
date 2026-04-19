import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { statusTranslations } from '../../../locales/es';
import { Project, TaskProject, TaskStatus } from '../../../types';
import { DropTask } from './DropTask';
import { TaskCard } from './TaskCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useUpTasks } from '../../../hooks';
import { useParams } from 'react-router-dom';

type TaskListProps = {
    tasks: TaskProject[],
    canEdit: boolean,
}

type GroupedTasks = {
    [key: string]: TaskProject[],
}

const statusStyles: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

export const TaskList = ({ tasks, canEdit }: TaskListProps) => {

    const { updateStatus } = useUpTasks();
    const queryClient = useQueryClient();
    const params = useParams();
    const projectId = params.projectId!;

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            toast.success(data);
        }
    });

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const handleDragEnd = (event: DragEndEvent) => {

        const { over, active } = event;

        if (over && over.id) {
            const taskId = active.id.toString();
            const status = over.id as TaskStatus;
            mutate({ projectId, taskId, status });

            queryClient.setQueryData(['project', projectId], (prevData: Project) => {
                const updatedTask = prevData.tasks.map((task: TaskProject) => {
                    if (task._id === taskId) {
                        return {
                            ...task,
                            status,
                        }
                    }
                    return task;
                })

                return {
                    ...prevData,
                    tasks: updatedTask
                }
            });
        }
    }

    return (
        <div>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>
                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5 '>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </div>
    )
}


