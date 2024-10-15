import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RootState } from '../store'
import { loginSuccess, logoutSuccess } from '../store/authSlice'
import authService from '../services/authService'
import { User } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'

interface LoginInput {
  username: string
  password: string
}

type UseAuth = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (data: LoginInput) => void
  logout: () => void
  isLoading: boolean
  isError: boolean
  error: Error | null
}

// Token'ın süresi dolmuş mu kontrol eden fonksiyon
const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token)
    const now = Date.now() / 1000 // Şu anki zaman (saniye cinsinden)
    return decoded.exp < now // Token süresi dolmuş mu?
  } catch (error) {
    return true // Eğer decode edilemiyorsa süresi dolmuş veya geçersiz say
  }
}

export interface CustomError extends Error {
  status?: number
  details?: string
}

const useAuth = (): UseAuth => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    mutate: login,
    isError,
    status,
    error
  } = useMutation<{ user: User; token: string }, CustomError, LoginInput>({
    mutationFn: async (loginInput: LoginInput) => {
      return authService.login(loginInput.username, loginInput.password)
    },
    onSuccess: (data: { user: { username: string; role: string }; token: string }) => {
      dispatch(loginSuccess(data))
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      navigate('/')
      toast.success('Login successful')
    },
    onError: (error: CustomError) => {
      toast.error(`${error.message}`)
    }
  })

  const logout = (): void => {
    authService.logout()
    dispatch(logoutSuccess())
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    // İlk yüklemede token'ı kontrol et, ama sadece bir kez çalışsın
    if (token && isTokenExpired(token)) {
      logout()
      toast.warning('Session expired. Please log in again.')
    }

    const handleStorageChange = (event: StorageEvent) => {
      // Eğer token değişmişse ya da silinmişse
      if (event.key === 'token') {
        const newToken = event.newValue
        if (!newToken || isTokenExpired(newToken)) {
          logout()
          toast.warning('Session expired or token removed. Please log in again.')
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange) // Temizleme işlemi
    }
  }, [logout])

  return {
    user: auth.user ?? null,
    token: auth.token ?? null,
    isAuthenticated: auth.isAuthenticated,
    login,
    logout,
    isLoading: status === 'pending',
    isError,
    error
  }
}

export default useAuth
