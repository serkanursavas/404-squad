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

const getNextGame = async (): Promise<Match> => {
  try {
    const response = await axiosInstance.get<Match>('/games/getNextGame')
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    console.log(error)

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

export default { getNextGame, getAllGames }
