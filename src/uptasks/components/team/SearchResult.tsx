import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTeamMember } from '../../../hooks/useTeamMember';
import { TeamMember } from '../../../types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface SearchResultProps {
    user: TeamMember,
}

export const SearchResult = ({ user }: SearchResultProps) => {
    
    const {addMember} = useTeamMember();

    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: addMember,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]});
        } 
    });

    const handleAddMember = () => {
        const member = {
            projectId,
            member: user._id,    
        }
        mutate(member);
    }

    return (
        <>
            <p className='mt-10 text-center font-bold'>
                Resultado: 
            </p>
            <div className='flex justify-between items-center'>
                <p>{user.name}</p>
                <button
                    onClick={handleAddMember}
                    className='text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer'
                >
                    Agregar al proyecto
                </button>
            </div>
        </>
    )
}
