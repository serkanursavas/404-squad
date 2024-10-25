import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'

export interface Goal {
  playerId: number
  teamColor: string
}

export interface GoalsUpdate {
  gameId: number
  goals: Goal[]
}

export interface TopScorer {
  id: number
  name: string
  surname: string
  goalCount: number
}

const addGoals = async (goalsData: GoalsUpdate): Promise<any> => {
  try {
    const response = await axiosInstance.post('/goals/admin/addGoals', goalsData)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

const getTopScorers = async (): Promise<TopScorer[]> => {
  try {
    const response = await axiosInstance.get('/goals/topScorers')
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

export default { addGoals, getTopScorers }
