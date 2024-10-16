import { JwtPayload, jwtDecode } from 'jwt-decode'
import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'
import { SignupFormValues } from '../types/FormTypes'

interface LoginResponse {
  token: string
}

export interface User {
  id: number
  username: string
  role: string
}

export const getUserFromToken = (token: string): User | null => {
  try {
    const decodedToken = jwtDecode<JwtPayload & { role: string } & { id: number }>(token)
    return {
      id: decodedToken.id || 0,
      username: decodedToken.sub || '',
      role: decodedToken.role
    }
  } catch (error) {
    console.error('Invalid token', error)
    return null
  }
}

const login = async (username: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/users/login', {
      username,
      password
    })

    const { token } = response.data

    // Token'ı localStorage'a kaydet
    localStorage.setItem('token', token)

    // Token'ı decode et
    const decodedUser = getUserFromToken(token)

    if (!decodedUser) {
      throw new Error('Invalid token')
    }

    return {
      user: decodedUser,
      token
    }
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const logout = (): void => {
  localStorage.removeItem('token')
}

const signup = async (signupData: SignupFormValues): Promise<{ user: User; token: string }> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/users/createUser', {
      username: signupData.username,
      password: signupData.password,
      passwordAgain: signupData.passwordAgain,
      playerCreateDTO: {
        name: signupData.name,
        surname: signupData.surname,
        foot: signupData.foot,
        position: signupData.position
      }
    })

    const { token } = response.data

    // Token'ı localStorage'a kaydet
    localStorage.setItem('token', token)

    // Token'ı decode et
    const decodedUser = getUserFromToken(token)

    if (!decodedUser) {
      throw new Error('Invalid token')
    }

    return {
      user: decodedUser,
      token
    }
  } catch (error: any) {
    // DTO Validation hatası mı? (422 Unprocessable Entity)
    if (error.response?.status === 422 && Array.isArray(error.response?.data)) {
      const validationErrors = error.response.data

      // Validation hatalarını customError'a detaylar olarak ekle
      const customError = new Error('Validation Error') as CustomError
      customError.status = 422
      customError.details = validationErrors

      throw customError
    }

    // Diğer hatalar için mevcut yapı
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

export default {
  login,
  logout,
  signup
}
