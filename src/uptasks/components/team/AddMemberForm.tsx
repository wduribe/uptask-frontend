import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage } from '../ErrorMessage';
import { TeamMemberForm } from '../../../types';
import { useTeamMember } from '../../../hooks/useTeamMember';
import { SearchResult } from './SearchResult';

export const AddMemberForm = () => {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { findMemberById } = useTeamMember();
 
    const mutation = useMutation({
        mutationFn: findMemberById
    });

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const member = {
            email: formData.email,
            projectId,
        }
        mutation.mutate(member);
        reset();

    }

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>
            <div className='mt-10'>
                {mutation.isPending && <p className='text-center'>Cargando...</p>}
                {mutation.error && <p className='text-center text-red-600'>{mutation.error.message}</p>}
                {mutation.data && <SearchResult user={mutation.data}/>}
            </div>
        </>
    )
} 