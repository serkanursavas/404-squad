import { useDispatch } from 'react-redux'
import { Match } from '../services/matchService'
import matchService from '../services/matchService'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNextMatchSuccess } from '../store/matchSlice'

const useMatches = () => {
  const dispatch = useDispatch()

  const {
    data: nextMatch,
    isError,
    error
  } = useQuery<Match, Error>({
    queryKey: ['matches'],
    queryFn: matchService.getNextGame
  })

  useEffect(() => {
    if (nextMatch) {
      dispatch(fetchNextMatchSuccess(nextMatch))
    }
  }, [nextMatch])

  return { nextMatch, isError, error }
}

export default useMatches
