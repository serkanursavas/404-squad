import { useDispatch } from 'react-redux'
import { Match } from '../services/matchService'
import matchService from '../services/matchService'
import { useEffect } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchAllMatchesSuccess, fetchNextMatchSuccess } from '../store/matchSlice'

const useMatches = () => {
  const dispatch = useDispatch()

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

  return { nextMatch, isError, error, allMatches, isAllMatchesError, allMatchesError, fetchNextPage, hasNextPage }
}

export default useMatches
