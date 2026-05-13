import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, signup } from '@/services/AutheService';

export const useEmailAuth = (mode: "login" | "signup") => {
  const queryClient = useQueryClient();
  const mutationFn = mode === "login" ? login : signup;

  return useMutation({
    mutationFn,
    onSuccess: (user) => {
          void queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};