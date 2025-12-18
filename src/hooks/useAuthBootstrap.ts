import { apiClient } from "@/api/client";
import { tokenStore } from "@/api/token";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CURRENT_USER_KEY } from "./use-auth";

export function useAuthBootstrap() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['auth', 'bootstrap'],
    queryFn: async () => {
      try {
        const res = await apiClient.post('/auth/refresh');
        tokenStore.set(res.data.access_token);
        await queryClient.invalidateQueries({
          queryKey: CURRENT_USER_KEY,
        });
      } catch {
        tokenStore.clear();
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
