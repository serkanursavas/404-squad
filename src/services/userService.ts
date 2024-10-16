import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'

export interface User {
  id: number
  username: string
  role: string
  createdAt: string
}

const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get('/users/admin/getAllUsers')

    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const deleteUserByUsername = async (username: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/users/admin/deleteUser/${username}`)

    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const updateUserRoleByUsername = async (username: string, updatedRole: string): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/users/admin/updateUserRole/${username}`, {
      role: updatedRole
    })

    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

export default { getAllUsers, deleteUserByUsername, updateUserRoleByUsername }
