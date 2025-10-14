export interface User {
  id: number
  email: string
  password: string
}

export interface AuthResponse {
  user: User | null
  success: boolean
  message: string
}
