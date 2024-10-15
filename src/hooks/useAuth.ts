import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RootState } from '../store'
import { loginSuccess, logoutSuccess } from '../store/authSlice'
import authService from '../services/authService'
import { User } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { showConfirmationModal } from '../utils/showConfirmationModal'
import { toast } from 'react-toastify'

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
  }

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
