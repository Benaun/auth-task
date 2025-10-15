import { useMutation } from '@tanstack/react-query'

import { loginUser } from '../api'
import type { AuthResponse } from '../model'

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: AuthResponse) => {
      if (data.success) {
        localStorage.setItem(
          'currentUser',
          JSON.stringify(data.user)
        )
      }
    }
  })

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending
  }
}
