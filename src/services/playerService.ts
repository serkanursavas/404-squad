import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'
import { TopPlayer } from './goalService'

export interface Player {
  id: number
  name: string
  surname: string
  foot: string
  photo: string
  position: string
  active: boolean
  rating: number
}

export interface UpdatePlayerData {
  id: number
  name: string
  surname: string
  foot: string
  photo: string | ''
  position: string
}

const getAllPlayers = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/players/getAllPlayers')
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const updatePlayer = async (updatedData: UpdatePlayerData): Promise<any> => {
  try {
    const response = await axiosInstance.put('/players/admin/updatePlayer', updatedData)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const getPlayerById = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/players/getPlayerById/${id}`)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const getTopRatedPlayers = async (): Promise<TopPlayer[]> => {
  try {
    const response = await axiosInstance.get('/players/getTopRatedPlayers')
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

export default { getAllPlayers, updatePlayer, getPlayerById, getTopRatedPlayers }
