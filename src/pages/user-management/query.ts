import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { toast } from 'sonner';
import { User, UserFormValues } from '@/pages/user-management/users';

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>('/api/users');
  return response.data;
};

const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await axios.post<User>('/api/users', data);
  return response.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await navigate({ to: '/users' });
    },
    onError: error => {
      toast(error.message, {});
    },
  });
};
