const { VITE_API_BASE_URL } = import.meta.env
export const API_BASE_URL: string =
  VITE_API_BASE_URL ?? 'http://localhost:3001'

export const config = {
  API_BASE_URL,
  RESEND_SECONDS: 10
}
