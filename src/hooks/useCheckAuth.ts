import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const useCheckAuth = () => {
    
    const {getUserAuthenticated} = useAuth();
    
    const {data, isError, isLoading} = useQuery({
        queryFn: getUserAuthenticated,
        queryKey: ['user'],
        retry: false,
        refetchOnWindowFocus: false,    
    });
 
    return {
        data, 
        isError,
        isLoading,
    }

}
