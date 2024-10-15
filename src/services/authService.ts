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
  const response = await axiosInstance.post<LoginResponse>('/login', {
    username,
    password
  })

  const { token } = response.data

  localStorage.setItem('token', token)

  const decodedToken = decodeToken(token)
  if (!decodedToken) {
    throw new Error('invalid token')
  }

  return {
    user: {
      username: decodedToken?.username || '',
      role: decodedToken?.role || ''
    },
    token
  }
}

const logout = (): void => {
  localStorage.removeItem('token')
}

export default {
  login,
  logout
}
