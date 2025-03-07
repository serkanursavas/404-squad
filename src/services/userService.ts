import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'

export interface User {
  id: number
  username: string
  role: string
  createdAt: string
}

export interface UpdateProfileParams {
  username?: string
  password?: string
  passwordAgain?: string
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

const resetPasswordByUsername = async (username: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/users/admin/resetPassword/${username}`)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const updateProfileByUsername = async (username: string, updateData: UpdateProfileParams): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/users/updateProfile/${username}`, updateData)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data || 'No additional details available'

    throw customError
  }
}

export default { getAllUsers, deleteUserByUsername, updateUserRoleByUsername, resetPasswordByUsername, updateProfileByUsername }
