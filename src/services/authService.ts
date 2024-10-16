import { JwtPayload, jwtDecode } from 'jwt-decode'
import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'
import { SignupFormValues } from '../types/FormTypes'

interface LoginResponse {
  token: string
}

export interface User {
  username: string
  role: string
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
    const decodedToken = jwtDecode<JwtPayload & { role: string }>(token)

    if (!decodedToken) {
      throw new Error('Invalid token')
    }

    return {
      user: {
        username: decodedToken.sub || '',
        role: decodedToken.role
      },
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
  // Token'ı localStorage'dan sil
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
    const decodedToken = jwtDecode<JwtPayload & { role: string }>(token)

    if (!decodedToken) {
      throw new Error('Invalid token')
    }

    return {
      user: {
        username: decodedToken.sub || '',
        role: decodedToken.role
      },
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
