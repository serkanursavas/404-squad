import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'

export interface PersonasData {
  rosterId: number
  personaIds: number[]
}

const getAllPersona = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/personas/all')

    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const savePersonas = async (personasData: PersonasData[]): Promise<{ personasData: PersonasData[] }> => {
  try {
    const response = await axiosInstance.post('/personas/savePersonas', personasData)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

export default { getAllPersona, savePersonas }
