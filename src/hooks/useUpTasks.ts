import { isAxiosError } from 'axios';
import { apiUpTasks } from '../api/api';
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema, Task, TaskFormData, taskSchema } from '../types';

interface ProjectApi {
    projectId: Project['_id'],
    projectFormData: ProjectFormData,

}

interface TaskApi {
    projectId: Project['_id'],
    taskFormData: TaskFormData,
    taskId: Task['_id'],
    status: Task['status'],
}

export const useUpTasks = () => {

    const createProject = async (formData: ProjectFormData) => {
        try{
            const {data} = await apiUpTasks.post('/projects', formData);
            return data;
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
                            
        }
    }

    const getProjects = async () => {
        try{
            const {data} = await apiUpTasks('/projects');
            const response = dashboardProjectSchema.safeParse(data);
            if(response.success){
                return response.data;
            }
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
                            
        }
    }

    const getProjectById = async (id: string) => {
        try{
            const {data} = await apiUpTasks(`/projects/${id}`);
            const response = editProjectSchema.safeParse(data);
            if(response.success){
                return response.data;
            }
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }
    }

    const getFullProject = async (id: string) => {
        try{
            const {data} = await apiUpTasks(`/projects/${id}`);
            const response = projectSchema.safeParse(data);
            if(response.success){
                return response.data;
            }
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }
    }

    const editProject = async ({projectId, projectFormData}:  ProjectApi) => {
        try{
            const {data} = await apiUpTasks.put<string>(`/projects/${projectId}`, projectFormData);
            return data;
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }            
        }
    }

    const deleteProject = async (projectId: string) => {
        try{
            const {data} = await apiUpTasks.delete<string>(`/projects/${projectId}`);
            return data;                            
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }
    }

    //*Endpoints Tasks
    const createTask = async ({projectId, taskFormData}: Pick<TaskApi, 'projectId' | 'taskFormData'> ) => {
        try{
             const {data} = await apiUpTasks.post<string>(`/projects/${projectId}/tasks`, taskFormData);
             return data;
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }   
    }

    const getTaskById = async ({ projectId, taskId}:Pick<TaskApi, 'projectId' | 'taskId'>) => {
        try{
            const {data} = await apiUpTasks(`/projects/${projectId}/tasks/${taskId}`);
            const response = taskSchema.safeParse(data);
            if(response.success){
                return response.data;
            }
            
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }
    }

    const editTask = async ({projectId, taskId, taskFormData}: Pick<TaskApi, 'projectId' | 'taskFormData' |'taskId'>) => {
        try{
            const {data} = await apiUpTasks.put<string>(`/projects/${projectId}/tasks/${taskId}`, taskFormData);
            return data;
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }
    } 

    const deleteTask  = async ({projectId, taskId}: Pick<TaskApi, 'projectId' | 'taskId'>) => {
        try{
            const {data} = await apiUpTasks.delete<string>(`/projects/${projectId}/tasks/${taskId}`);
            return data;
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }
    }

    const updateStatus = async ({projectId, taskId, status}: Pick<TaskApi, 'projectId' | 'taskId' | 'status'>) => {
        try{
            const {data} = await apiUpTasks.post<string>(`/projects/${projectId}/tasks/${taskId}/status`, {status});
            return data;
        }catch(error){
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
        }
    }

    

    return {

        //Methods projects
        createProject,
        getProjects,
        getProjectById,
        getFullProject,
        editProject,
        deleteProject,


        //Methods tasks
        createTask,
        getTaskById,
        editTask,
        deleteTask,
        updateStatus,
    }
 

}