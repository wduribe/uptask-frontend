import { useForm } from 'react-hook-form';
import { NoteFormData } from '../../../types';
import { ErrorMessage } from '../ErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNote } from '../../../hooks/useNote';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';


const initialValues: NoteFormData = {
    content: '',
}

export const AddNotesForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });


    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryClient = useQueryClient();

    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const { createNote } = useNote();

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
            toast.success(data);
        }
    });

    const handleAddNote = (formData: NoteFormData) => {

        const data = {
            projectId,
            taskId,
            formData,
        }
        mutate(data);
        reset();
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                    {...register("content", {
                        required: "El contenido de la nota es obligatorio"
                    })}
                />
                {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </div>

            <input className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer" type="submit" value="Crear Nota" />
        </form>
    )
}
