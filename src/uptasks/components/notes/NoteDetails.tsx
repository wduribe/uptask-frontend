import { useMemo } from 'react';
import { useCheckAuth } from '../../../hooks/useCheckAuth';
import { Note } from '../../../types';
import { formatDate } from '../../../utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNote } from '../../../hooks/useNote';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';


interface NoteDetailsProps {
    note: Note,
}

export const NoteDetails = ({ note }: NoteDetailsProps) => {

    const { data } = useCheckAuth();
    const { deleteNote } = useNote();

    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

    const params = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();
    const projectId = params.projectId!;
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;



    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
            toast.success(data);
        }
    });

    return (
        <div className='p-3 flex justify-between items-center'>
            <div>
                <p>
                    {note.content} por: <span className='font-bold'>{note.createdBy.name}</span>
                </p>
                <p className='text-xs text-slate-500'>
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete ? <button onClick={() => mutate({ projectId, taskId, noteId: note._id })} type='button' className='bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors'>Eliminar</button> : null}
        </div>
    )
}
