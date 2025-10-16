import { useQuery } from '@tanstack/react-query'

import { getVerifyCode } from '../api'

export const useVerifyCode = (enteredCode: string | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['verify', enteredCode],
    queryFn: async () => {
      const verifyCode = await getVerifyCode()
      return enteredCode === String(verifyCode)
    },
    enabled: !!enteredCode
  })

  return {
    isVerified: data,
    isLoading,
    error
  }
}
