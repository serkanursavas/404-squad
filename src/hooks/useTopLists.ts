import { useQuery } from '@tanstack/react-query'

import goalService from '../services/goalService'
import playerService from '../services/playerService'

const useTopLists = () => {
  const {
    data: topScorers = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['topScorers'],
    queryFn: goalService.getTopScorers,
    staleTime: 1000 * 60 * 15, // 15 dakika boyunca taze tut
    refetchOnWindowFocus: false // Pencere odağı değiştiğinde yeniden fetch etme
  })

  const {
    data: topRatedPlayers = [],
    isLoading: isTopRatedPlayersLoading,
    error: isTopRatedPlayersError
  } = useQuery({
    queryKey: ['topRatedPlayers'],
    queryFn: playerService.getTopRatedPlayers,
    staleTime: 1000 * 60 * 15, // 15 dakika boyunca taze tut
    refetchOnWindowFocus: false // Pencere odağı değiştiğinde yeniden fetch etme
  })

  return {
    topScorers,
    isLoading,
    error,
    topRatedPlayers,
    isTopRatedPlayersLoading,
    isTopRatedPlayersError
  }
}

export default useTopLists
