import { apiClient as api } from '@/api/client';
import type { Organization, OrganizationDetail } from '@/api/types';
import type { OrganizationInput } from '@/lib/validations';

export const organizationsApi = {
  getAll: async (): Promise<Organization[]> => {
    const response = await api.get<Organization[]>('/organizations');
    return response.data;
  },

  getById: async (id: number): Promise<OrganizationDetail> => {
    const response = await api.get<OrganizationDetail>(`/organizations/${id}`);
    return response.data;
  },

  create: async (data: OrganizationInput): Promise<Organization> => {
    const response = await api.post<Organization>('/organizations', data);
    return response.data;
  },

  update: async (
    id: number,
    data: OrganizationInput,
  ): Promise<Organization> => {
    const response = await api.put<Organization>(`/organizations/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/organizations/${id}`);
  },
};
