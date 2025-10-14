import { useMutation } from '@tanstack/react-query'

import { getVerifyCode } from '../api'

export const useVerifyCode = () => {
  const verifyMutation = useMutation({
    mutationFn: async (enteredCode: string) => {
      const verifyCode = await getVerifyCode()
      return enteredCode === String(verifyCode)
    }
  })

  return {
    verify: verifyMutation.mutate,
    isLoading: verifyMutation.isPending,
    isSuccess: verifyMutation.isSuccess
  }
}
