import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import userService, { User } from '../services/userService'
import { fetchUsersSuccess } from '../store/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const useUser = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

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
    mutationFn: (username: string) => userService.deleteUserByUsername(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete user')
    }
  })

  const { mutate: updateUserRole } = useMutation({
    mutationFn: ({ username, updatedRole }: { username: string; updatedRole: string }) => userService.updateUserRoleByUsername(username, updatedRole),
    onSuccess: () => {
      navigate('/admin/users')
      toast.success('User role updated successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update user role')
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

  return { users: data, isLoading, isError, error, deleteUser, updateUserRole, resetPassword }
}

export default useUser
