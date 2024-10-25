import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'

export interface Match {
  id: number
  location: string
  dateTime: string
  weather: string
  homeTeamScore: number
  awayTeamScore: number
  played: boolean
  voted: boolean
  goals: Goal[]
  rosters: Roster[]
}

export interface Goal {
  playerId: number
  playerName: string
  teamColor: string
}

export interface Roster {
  id: number
  teamColor: string
  rating: number
  playerId: number
  playerName: string
}

export interface CreateMatchRoster {
  teamColor: string
  playerId: number
}

export interface UpdateMatchRoster extends CreateMatchRoster {
  id?: number
}

export interface BaseMatchRequest<T> {
  location: string
  weather: string
  dateTime: string
  teamSize: number
  rosters: T[]
}

export interface CreateMatchRequest extends BaseMatchRequest<CreateMatchRoster> {}

export interface UpdateMatchRequest extends BaseMatchRequest<UpdateMatchRoster> {
  id: number
}

const getNextGame = async (): Promise<Match> => {
  try {
    const response = await axiosInstance.get<Match>('/games/getNextGame')
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

const getAllGames = async (page: number, size: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/games/getAllGames?page=${page}&size=${size}`)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

const createMatch = async (createMatchData: CreateMatchRequest): Promise<any> => {
  try {
    const response = await axiosInstance.post('/games/admin/createGame', createMatchData)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

const updateMatch = async (id: number, createMatchData: UpdateMatchRequest): Promise<any> => {
  try {
    const response = await axiosInstance.put(`/games/admin/updateGame/${id}`, createMatchData)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

const getGameById = async (id: number): Promise<Match> => {
  try {
    const response = await axiosInstance.get(`/games/getGameById/${id}`)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

const deleteGameById = async (id: number): Promise<Match> => {
  try {
    const response = await axiosInstance.delete(`/games/admin/deleteGame/${id}`)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

export default { getNextGame, getAllGames, createMatch, getGameById, deleteGameById, updateMatch }
