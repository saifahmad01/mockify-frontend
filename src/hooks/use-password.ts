import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/auth';
import { toast } from 'sonner';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),

    onSuccess: () => {
      toast.success(
        'Check your email for a link to reset your password'
      );
    },

    onError: () => {
      // Always generic (security)
      toast.success(
        'Check your email for a link to reset your password'
      );
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: {
      token: string;
      newPassword: string;
    }) => authApi.resetPassword(data),

    onSuccess: () => {
      toast.success('Password updated successfully');
    },

    onError: () => {
      toast.error(
        'Invalid or expired reset link'
      );
    },
  });
}

