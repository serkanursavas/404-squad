import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import userService, { User } from '../services/userService'
import { fetchUsersSuccess } from '../store/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const useUser = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

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

  return { users: data, isLoading, isError, error, deleteUser }
}

export default useUser
