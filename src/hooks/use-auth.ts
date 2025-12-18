import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth';
import { toast } from 'sonner';
import type { LoginRequest, RegisterRequest, User } from '@/api/types';
import { tokenStore } from '@/api/token';

export const CURRENT_USER_KEY = ['auth', 'me'];

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: CURRENT_USER_KEY,
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}


export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),

    onSuccess: async (res) => {
      
      // For debugging
      console.log('Login success:', res);

      tokenStore.set(res.access_token);

      await queryClient.invalidateQueries({
        queryKey: CURRENT_USER_KEY,
      });

      toast.success('Logged in');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Invalid login');
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),

    onSuccess: async (res) => {
      tokenStore.set(res.access_token);
          
      await queryClient.invalidateQueries({
        queryKey: CURRENT_USER_KEY,
      });

      toast.success('Account created');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Registration failed');
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      tokenStore.clear();
      queryClient.removeQueries({ queryKey: CURRENT_USER_KEY });
      toast.success('Logged out');
    },
    onError: () => {
      tokenStore.clear();
      queryClient.removeQueries({ queryKey: CURRENT_USER_KEY });
    },
  });
}


export function useGoogleLogin() {
  return {
    initiateGoogleLogin: () => {
      window.location.href = authApi.getGoogleAuthUrl();
    },
  };
}
