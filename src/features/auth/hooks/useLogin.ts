import { useQuery } from '@tanstack/react-query'

import { loginUser } from '../api'
import type { LoginFormData } from '../model'

export const useLogin = (credentials: LoginFormData | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', credentials],
    queryFn: () => loginUser(credentials!),
    enabled: !!credentials?.email && !!credentials?.password
  })

  return {
    data,
    isLoading,
    error
  }
}
