import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import userService, { UpdateProfileParams, User } from '../services/userService'
import { fetchUsersSuccess } from '../store/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getUserFromToken } from '../services/authService'
import { logoutSuccess } from '../store/authSlice'
import { RootState } from '../store'
import authService from '../services/authService'

const useUser = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { users } = useSelector((state: RootState) => state.users)

  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: userService.getAllUsers
  })

  useEffect(() => {
    if (data) {
      dispatch(fetchUsersSuccess({ users: data }))
    }
  }, [data])

  const { mutate: deleteUser } = useMutation({
    mutationFn: (username: string) => {
      const admins = users.filter(user => user.role === 'ADMIN')
      const currentUserIsAdmin = admins.some(admin => admin.username === username)

      if (currentUserIsAdmin && admins.length <= 2) {
        return Promise.reject(new Error('System must have at least one admin. User deletion cancelled.'))
      }

      return userService.deleteUserByUsername(username)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete user')
    }
  })

  const { mutate: updateUserRole } = useMutation({
    mutationFn: ({ username, updatedRole }: { username: string; updatedRole: string }) => {
      const admins = users.filter(user => user.role === 'ADMIN')
      const currentUserIsAdmin = admins.some(admin => admin.username === username)

      if (currentUserIsAdmin && admins.length <= 2 && updatedRole !== 'ADMIN') {
        navigate('/admin/users')
        return Promise.reject(new Error('System must have at least one admin. Role update cancelled.'))
      }

      return userService.updateUserRoleByUsername(username, updatedRole)
    },
    onSuccess: (_, { username, updatedRole }: { username: string; updatedRole: string }) => {
      const token = localStorage.getItem('token')
      if (token) {
        const currentUser = getUserFromToken(token)

        if (currentUser?.username === username && updatedRole !== currentUser.role) {
          toast.info('Your role has been changed. Please log in again to continue.')
          authService.logout()
          dispatch(logoutSuccess())
        }
      }

      navigate('/admin/users')
      toast.success('User role updated successfully')
    },
    onError: (error: any) => {
      // Eğer role güncelleme sırasında hatayla karşılaşılırsa, hata mesajı göster
      toast.error(error?.message || 'Failed to update user role')
    }
  })

  const { mutate: resetPassword } = useMutation({
    mutationFn: (username: string) => userService.resetPasswordByUsername(username),
    onSuccess: () => {
      navigate('/admin/users')
      toast.success('Password reset successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to reset password')
    }
  })

  const { mutate: updateProfile } = useMutation({
    mutationFn: ({ username, updateData }: { username: string; updateData: UpdateProfileParams }) =>
      userService.updateProfileByUsername(username, updateData),
    onSuccess: () => {
      navigate('/')
      toast.success('Profile updated successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile')
    }
  })

  return { users: data, isLoading, isError, error, deleteUser, updateUserRole, resetPassword, updateProfile }
}

export default useUser
