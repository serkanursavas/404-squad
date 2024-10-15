import { CustomError } from '../hooks/useAuth'
import { decodeToken } from '../utils/jwtDecode'
import axiosInstance from './axiosInstance'

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
    const decodedToken = decodeToken(token)
    if (!decodedToken) {
      throw new Error('Invalid token')
    }

    return {
      user: {
        username: decodedToken?.username || '',
        role: decodedToken?.role || ''
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

export default {
  login,
  logout
}
