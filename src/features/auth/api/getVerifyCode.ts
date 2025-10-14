import { config } from '@/shared/config/config'

export const getVerifyCode = async (): Promise<string> => {
  try {
    const response = await fetch(
      `${config.API_BASE_URL}/verifyCode`
    )
    const data = await response.json()
    return data
  } catch {
    throw new Error('Не удалось получить код верификации')
  }
}
