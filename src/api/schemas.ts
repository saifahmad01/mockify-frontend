import { apiClient } from './client';
import type { MockSchema, MockSchemaDetail } from './types';

export const schemasApi = {
  getByProject: async (projectId: number): Promise<MockSchema[]> => {
    const response = await apiClient.get<MockSchema[]>(
      `/projects/${projectId}/schemas`,
    );
    return response.data;
  },

  getById: async (id: number): Promise<MockSchemaDetail> => {
    const response = await apiClient.get<MockSchemaDetail>(`/schemas/${id}`);
    return response.data;
  },

  create: async (data: {
    name: string;
    projectId: number;
    schemaJson: Record<string, object>;
  }): Promise<MockSchema> => {
    const response = await apiClient.post<MockSchema>('/schemas', data);
    return response.data;
  },

  update: async (
    id: number,
    data: { name: string; schemaJson: Record<string, object> },
  ): Promise<MockSchema> => {
    const response = await apiClient.put<MockSchema>(`/schemas/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/schemas/${id}`);
  },
};
