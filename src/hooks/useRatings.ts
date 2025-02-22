import { useMutation } from '@tanstack/react-query'
import { RatingData } from '../services/ratingService'
import { CustomError } from './useAuth'
import ratingService from '../services/ratingService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useMatches from './useMatches'
import { setVoteStatus } from '../store/authSlice'
import { useDispatch } from 'react-redux'

const useRatings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { fetchNextMatch } = useMatches()

  const {
    mutate: saveRatings,
    isError: isError,
    error: saveRatingError,
    status: saveRatingStatus
  } = useMutation<{ ratingsData: RatingData[] }, CustomError, RatingData[]>({
    mutationFn: async (ratingsData: RatingData[]) => {
      return ratingService.saveRatings(ratingsData)
    },
    onSuccess: () => {
      fetchNextMatch() // Manuel olarak nextMatch'i tekrar tetikleyin
      dispatch(setVoteStatus(true))
      navigate('/')
      toast.info('Votes saved successfully')
    },
    onError: (error: CustomError) => {
      if (error.details && Array.isArray(error.details) && error.details.length > 0) {
        error.details.forEach(detail => toast.error(detail))
      } else {
        toast.error(`${error.message}`)
      }
    }
  })

  const {
    mutate: checkVote,
    isError: isCheckVoteError,
    error: checkVoteError
  } = useMutation<{ hasVoted: boolean }, CustomError, number>({
    mutationFn: async (playerId: number) => {
      const hasVoted = await ratingService.checkVote(playerId)
      return { hasVoted }
    },
    onSuccess: data => {
      // Redux'ta hasVoted durumunu güncelle
      dispatch(setVoteStatus(data.hasVoted))
    },
    onError: (error: CustomError) => {
      if (error.details && Array.isArray(error.details) && error.details.length > 0) {
        error.details.forEach(detail => toast.error(detail))
      } else {
        toast.error(`${error.message}`)
      }
    }
  })

  return {
    saveRatings,
    isError,
    saveRatingStatus,
    saveRatingError,
    checkVote,
    isCheckVoteError,
    checkVoteError
  }
}

export default useRatings
