import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RootState } from '../store'
import { loginSuccess, logoutSuccess } from '../store/authSlice'
import authService from '../services/authService'
import { User } from '../services/authService'

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
}

const useAuth = (): UseAuth => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  const queryClient = useQueryClient()

  const {
    mutate: login,
    isError,
    status
  } = useMutation<{ user: User; token: string }, Error, LoginInput>({
    mutationFn: async (loginInput: LoginInput) => {
      return authService.login(loginInput.username, loginInput.password)
    },
    onSuccess: (data: { user: { username: string; role: string }; token: string }) => {
      dispatch(loginSuccess(data))
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
    onError: (error: unknown) => {
      console.error('Login failed:', error)
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
    isError
  }
}

export default useAuth
