import { config } from '@/shared/config/config'

import {
  type AuthResponse,
  type LoginFormData,
  type User
} from '../model'

export const loginUser = async (
  credentials: LoginFormData
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/users`)
    const users: User[] = await response.json()

    const user = users.find(
      u =>
        u.email === credentials.email &&
        u.password === credentials.password
    )

    if (user) {
      return {
        user,
        success: true,
        message: 'Login successful'
      }
    } else {
      return {
        user: null,
        success: false,
        message: 'Неверные данные для входа'
      }
    }
  } catch {
    return {
      user: null,
      success: false,
      message: 'Ошибка сервера. Попробуйте позже'
    }
  }
}
