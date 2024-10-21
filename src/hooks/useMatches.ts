import { useDispatch, useSelector } from 'react-redux'
import { CreateMatchRequest, Match, UpdateMatchRequest } from '../services/matchService'
import matchService from '../services/matchService'
import { useEffect, useState } from 'react'
import { QueryClient, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { fetchAllMatchesSuccess, fetchMatchDetailsSuccess, fetchNextMatchSuccess } from '../store/matchSlice'
import { CustomError } from './useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '../store'

const useMatches = (shouldFetchAllMatches = false, isNeededNextMatch = false) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = new QueryClient()

  const reduxNextMatch = useSelector((state: RootState) => state.matches.nextMatch)

  const [isLoading, setIsLoading] = useState(false)

  const {
    mutate: fetchNextMatch,
    error: nextMatchError,
    status: fetchStatus
  } = useMutation<Match, CustomError, void>({
    mutationFn: matchService.getNextGame,
    onSuccess: (data: Match) => {
      dispatch(fetchNextMatchSuccess(data))
    }
  })

  useEffect(() => {
    if (!reduxNextMatch && isNeededNextMatch) {
      setIsLoading(true)
      fetchNextMatch()
      setIsLoading(false)
    }

    const interval = setInterval(() => {
      if (isNeededNextMatch) {
        fetchNextMatch()
      }
    }, 300000)

    return () => clearInterval(interval)
  }, [reduxNextMatch, dispatch, isNeededNextMatch, fetchNextMatch])

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
    enabled: shouldFetchAllMatches, // Yalnızca gerekli olduğunda çalışır
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

  const {
    mutate: updateMatch,
    isError: isUpdateMatchError,
    error: updateMatchError
  } = useMutation<{ id: number; updateMatchData: UpdateMatchRequest }, CustomError, { id: number; updateMatchData: UpdateMatchRequest }>({
    mutationFn: async ({ id, updateMatchData }: { id: number; updateMatchData: UpdateMatchRequest }) => {
      return matchService.updateMatch(id, updateMatchData)
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['matches'] }) // invalidate matches
      queryClient.invalidateQueries({ queryKey: ['nextMatch'] }) // nextMatch verisini sıfırlıyoruz
      queryClient.invalidateQueries({ queryKey: ['matchDetails', id] }) // Maç detaylarını invalidate ediyoruz
      fetchNextMatch() // Manuel olarak nextMatch'i tekrar tetikleyin
      navigate('/')
      toast.info('Match updates successfully')
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

    // ID'nin geçerli bir sayı olup olmadığını kontrol et
    if (isNaN(id)) {
      console.error(`Invalid match id: ${id}`)
      return null
    }

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

  const {
    mutate: deleteMatch,
    isError: isdeleteMatchError,
    error: deleteMatchError
  } = useMutation<{ id: number }, CustomError, number>({
    mutationFn: async (id: number) => {
      return matchService.deleteGameById(id)
    },
    onSuccess: () => {
      // Cache temizleme ve Redux güncellemesi
      queryClient.invalidateQueries({ queryKey: ['nextMatch'] }) // React Query cache'ini sıfırlıyoruz
      queryClient.removeQueries({ queryKey: ['nextMatch'] }) // Remove cache entry manually
      dispatch(fetchNextMatchSuccess(null)) // Redux'taki nextMatch'i sıfırlıyoruz
      navigate('/')
    },
    onError: (error: CustomError) => {
      if (error.status === 404) {
        dispatch(fetchNextMatchSuccess(null))
      } else {
        toast.error(error.message)
      }
    }
  })

  return {
    // nextMatch: nextMatchFromRedux || nextMatch,
    nextMatch: reduxNextMatch,
    nextMatchIsLoading: isLoading || fetchStatus === 'pending',
    nextMatchError,
    allMatches,
    isAllMatchesError,
    allMatchesError,
    fetchNextPage,
    hasNextPage,
    createMatch,
    isCreateMatchError,
    createMatchError,
    useMatchDetails,
    deleteMatch,
    isdeleteMatchError,
    deleteMatchError,
    updateMatch,
    isUpdateMatchError,
    updateMatchError
  }
}

export default useMatches
