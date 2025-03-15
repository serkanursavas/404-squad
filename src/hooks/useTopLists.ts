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
    retry: 0, // Yeniden denemeleri devre dışı bırakır
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
    retry: 0, // Yeniden denemeleri devre dışı bırakır
    staleTime: 1000 * 60 * 15, // 15 dakika boyunca taze tut
    refetchOnWindowFocus: false // Pencere odağı değiştiğinde yeniden fetch etme
  })

  const {
    data: topFormPlayers = [],
    isLoading: isTopFormPlayersLoading,
    error: isTopFormPlayersError
  } = useQuery({
    queryKey: ['topFormPlayers'],
    queryFn: playerService.getTopFormPlayers,
    retry: 0, // Yeniden denemeleri devre dışı bırakır
    staleTime: 1000 * 60 * 15, // 15 dakika boyunca taze tut
    refetchOnWindowFocus: false // Pencere odağı değiştiğinde yeniden fetch etme
  })

  const {
    data: legendaryDuos = [],
    isLoading: isLegendaryDuosLoading,
    error: isLegendaryDuosError
  } = useQuery({
    queryKey: ['legendaryDuos'],
    queryFn: playerService.getLegendaryDuos,
    retry: 0, // Yeniden denemeleri devre dışı bırakır
    staleTime: 1000 * 60 * 15, // 15 dakika boyunca taze tut
    refetchOnWindowFocus: false // Pencere odağı değiştiğinde yeniden fetch etme
  })

  const {
    data: rivalDuos = [],
    isLoading: isRivalDuosLoading,
    error: isRivalDuosError
  } = useQuery({
    queryKey: ['rivalDuos'],
    queryFn: playerService.getRivalDuos,
    retry: 0, // Yeniden denemeleri devre dışı bırakır
    staleTime: 1000 * 60 * 15, // 15 dakika boyunca taze tut
    refetchOnWindowFocus: false // Pencere odağı değiştiğinde yeniden fetch etme
  })

  return {
    topScorers,
    isLoading,
    error,
    topRatedPlayers,
    isTopRatedPlayersLoading,
    isTopRatedPlayersError,
    topFormPlayers,
    isTopFormPlayersLoading,
    isTopFormPlayersError,
    legendaryDuos,
    isLegendaryDuosLoading,
    isLegendaryDuosError,
    rivalDuos,
    isRivalDuosLoading,
    isRivalDuosError
  }
}

export default useTopLists
