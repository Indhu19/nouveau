import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { toast } from 'sonner';

import { FormElement, FormElementValue } from './types/form-builder';

export interface Form {
  createdAt: string;
  description?: string;
  elements: FormElement[];
  id: string;
  name: string;
  updatedAt: string;
}

export interface FormInput {
  description?: string;
  elements: FormElement[];
  name: string;
  url?: string;
}

export const fetchForms = async (): Promise<Form[]> => {
  const response = await axios.get<Form[]>('/api/forms');
  return response.data;
};

export const fetchForm = async (id: string): Promise<Form> => {
  console.log(id);
  const response = await axios.get<Form>(`/api/forms/${id}`);
  return response.data;
};

export const fetchFormByUrl = async (url: string): Promise<Form> => {
  console.log("url",url);
  const response = await axios.get<Form>(`/api/forms/url/${url}`);
  return response.data;
};

export const createForm = async (data: FormInput): Promise<Form> => {
  data.url ??= `/forms/${Date.now().toString()}`;
  const response = await axios.post<Form>('/api/forms', data);
  return response.data;
};

export const deleteForm = async (id: string): Promise<void> => {
  await axios.delete(`/api/forms/${id}`);
};

export const useForms = () => {
  return useQuery({
    queryFn: fetchForms,
    queryKey: ['forms'],
  });
};

export const useForm = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryFn: () => fetchForm(id),
    queryKey: ['forms', id],
  });
};

export const useFormByUrl = (url: string) => {
  return useQuery({
    enabled: !!url,
    queryFn: () => fetchFormByUrl(url),
    queryKey: ['forms', 'url', url],
  });
};

export const useCreateForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createForm,
    onError: error => {
      toast.error('Failed to create form');
      console.error(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['forms'] });
      await navigate({ to: '/form-builder' });
    },
  });
};

export const useDeleteForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteForm,
    onError: error => {
      toast.error('Failed to delete form');
      console.error(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('Form deleted');
    },
  });
};

export const submitForm = async (
  formId: string,
  data: Record<string, FormElementValue>
): Promise<void> => {
  await axios.post(`/api/forms/${formId}/submit`, data);
};
