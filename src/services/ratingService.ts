import { CustomError } from '../hooks/useAuth'
import axiosInstance from './axiosInstance'

export interface RatingData {
  playerId: number
  rate: number
  rosterId: number
}

const saveRatings = async (ratingsData: RatingData[]): Promise<{ ratingsData: RatingData[] }> => {
  try {
    const response = await axiosInstance.post('/ratings/saveRatings', ratingsData)
    return response.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

const checkVote = async (playerId: number): Promise<boolean> => {
  try {
    const hasVoted = await axiosInstance.get(`/ratings/checkVote/${playerId}`)
    return hasVoted.data
  } catch (error: any) {
    const customError = new Error(error.response?.data?.message || error.message || 'An unknown error occurred') as CustomError
    customError.status = error.response?.status || 500
    customError.details = error.response?.data?.details || 'No additional details available'
    throw customError
  }
}

export default { saveRatings, checkVote }
