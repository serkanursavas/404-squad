import { useDispatch, useSelector } from 'react-redux'
import { CreateMatchRequest, Match } from '../services/matchService'
import matchService from '../services/matchService'
import { useEffect } from 'react'
import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { fetchAllMatchesSuccess, fetchMatchDetailsSuccess, fetchNextMatchSuccess } from '../store/matchSlice'
import { CustomError } from './useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '../store'

const useMatches = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = new QueryClient()

  const {
    data: nextMatch,
    isError,
    error
  } = useQuery<Match, Error>({
    queryKey: ['nextMatch'],
    queryFn: matchService.getNextGame
  })

  useEffect(() => {
    if (nextMatch) {
      dispatch(fetchNextMatchSuccess(nextMatch))
    }
  }, [nextMatch])

  const {
    data,
    isError: isAllMatchesError,
    error: allMatchesError,
    fetchNextPage, // Sayfa geçişlerinde kullanılan fonksiyon
    hasNextPage // Sonraki sayfanın olup olmadığını kontrol etmek için
  } = useInfiniteQuery({
    queryKey: ['matches'],
    queryFn: ({ pageParam = 0 }) => matchService.getAllGames(pageParam, 10), // pageParam, API'den gelen mevcut sayfa
    getNextPageParam: (lastPage, allPages) => {
      const { totalPages } = lastPage // Backend'den dönen toplam sayfa sayısını kullanıyoruz
      const nextPage = allPages.length
      return nextPage < totalPages ? nextPage : undefined // Eğer daha fazla sayfa varsa, devam et
    },
    initialPageParam: 0 // İlk sayfa için başlangıç değeri
  })

  // Tüm sayfaları birleştiriyoruz
  const allMatches = data?.pages.flatMap(page => page.content) || []

  useEffect(() => {
    if (allMatches.length > 0) {
      dispatch(fetchAllMatchesSuccess(allMatches))
    }
  }, [allMatches])

  const {
    mutate: createMatch,
    isError: isCreateMatchError,
    error: createMatchError
  } = useMutation<{ createMatchData: CreateMatchRequest }, CustomError, CreateMatchRequest>({
    mutationFn: async (createMatchData: CreateMatchRequest) => {
      return matchService.createMatch(createMatchData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] })
      navigate('/')
      toast.info('Match created successfully')
    },
    onError: (error: CustomError) => {
      if (error.details && Array.isArray(error.details) && error.details.length > 0) {
        error.details.forEach(detail => toast.error(detail))
      } else {
        toast.error(`${error.message}`)
      }
    }
  })

  const useMatchDetails = (id: number) => {
    const dispatch = useDispatch()
    const matchDetails = useSelector((state: RootState) => state.matches.allMatches.find(match => match.id === id))

    useEffect(() => {
      if (!matchDetails || !matchDetails.goals || !matchDetails.rosters) {
        // Maç detayları eksikse, API'den detayı çekiyoruz
        matchService
          .getGameById(id)
          .then(match => {
            dispatch(fetchMatchDetailsSuccess(match)) // Redux'a detayı ekliyoruz
          })
          .catch(error => {
            console.error('Failed to fetch match details', error)
          })
      }
    }, [id, matchDetails, dispatch])

    return matchDetails
  }

  return {
    nextMatch,
    isError,
    error,
    allMatches,
    isAllMatchesError,
    allMatchesError,
    fetchNextPage,
    hasNextPage,
    createMatch,
    isCreateMatchError,
    createMatchError,
    useMatchDetails
  }
}

export default useMatches
