import { CustomError } from '../hooks/useAuth'
import { FormTrend, LegendaryDuos, RivalDuos } from '../types/TopListTypes'
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
  personas: PlayerPersona[] // Persona dizisi
  last5GameRating: Number[]
}

export interface PlayerPersona {
  personaId: number
  personaName: string
  personaDescription: string
  count: number
  category: string
}

export interface UpdatePlayerData {
  id: number
  name: string
  surname: string
  foot: string
  photo: string | ''
  position: string
}

export interface MvpInfo {
  id: number
  name: string
  surname: string
  photo: string
  position: string
  rating: number
}

export interface TopRated {
  playerId: number
  name: string
  surname: string
  rating?: number // Optional, sadece en iyi golcü listesi için kullanılır
  gameCount?: number // Optional, sadece en iyi golcü listesi için kullanılır
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

const getTopFormPlayers = async (): Promise<FormTrend[]> => {
  try {
    const response = await axiosInstance.get('/players/getTopFormPlayers')
    console.log(response.data)

    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const getLegendaryDuos = async (): Promise<LegendaryDuos[]> => {
  try {
    const response = await axiosInstance.get('/players/getLegendaryDuos')
    console.log(response.data)

    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const getRivalDuos = async (): Promise<RivalDuos[]> => {
  try {
    const response = await axiosInstance.get('/players/getRivalDuos')
    console.log(response.data)

    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

const getMvp = async (): Promise<MvpInfo> => {
  try {
    const response = await axiosInstance.get('/games/getMvp')
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'

    throw customError
  }
}

export default { getAllPlayers, updatePlayer, getPlayerById, getTopRatedPlayers, getMvp, getTopFormPlayers, getLegendaryDuos, getRivalDuos }
