import { isAxiosError } from 'axios';
import { Project, TeamMember, teamMembersSchema } from '../types';
import { apiUpTasks } from '../api/api';


interface TeamApi {
    email: TeamMember['email'],
    projectId: Project['_id'],
    member: TeamMember['_id'],
}

export const useTeamMember = () => {

    const findMemberById = async ({ email, projectId }: Pick<TeamApi, 'email' | 'projectId'>) => {
        try {
            const { data } = await apiUpTasks.post<TeamMember>(`/projects/${projectId}/team/find-member`, { email });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }

    }

    const addMember = async ({ projectId, member }: Pick<TeamApi, 'projectId' | 'member'>) => {
        try {
            const { data } = await apiUpTasks.post<string>(`/projects/${projectId}/team`, { member });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }


    const getProjectTeam = async ({ projectId }: Pick<TeamApi, 'projectId'>) => {
        try {
            const { data } = await apiUpTasks(`/projects/${projectId}/team`);
            const response = teamMembersSchema.safeParse(data);
            if(response.success){
                return response.data;
            } 
            
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    const deleteMember = async ({ projectId, member }: Pick<TeamApi, 'projectId' | 'member' >) => {
        try {
            const { data } = await apiUpTasks.delete<string>(`/projects/${projectId}/team/${member}`);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    }

    return {
        findMemberById,
        addMember,
        getProjectTeam,
        deleteMember,
    }

}