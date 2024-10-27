import { useMutation, useQuery } from '@tanstack/react-query'
import { MvpInfo, Player, UpdatePlayerData } from '../services/playerService'
import playerService from '../services/playerService'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlayersSuccess } from '../store/playerSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '../store'

const usePlayer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redux'tan oyuncu verilerini alıyoruz
  const players = useSelector((state: RootState) => state.players.players)

  const { data, isLoading, isError, error } = useQuery<Player[], Error>({
    queryKey: ['players'],
    queryFn: playerService.getAllPlayers,
    staleTime: 1000 * 60 * 1, // 5 dakika boyunca veri taze kabul edilir
    refetchInterval: players.length > 0 ? 1000 * 60 * 1 : false // Eğer Redux'ta veri varsa 5 dakikada bir refetch yapılır
  })

  useEffect(() => {
    if (data) {
      dispatch(fetchPlayersSuccess({ players: data }))
    }
  }, [data, dispatch])

  const { mutate: updatePlayer } = useMutation({
    mutationFn: ({ updatedData }: { updatedData: UpdatePlayerData }) => playerService.updatePlayer(updatedData),
    onSuccess: () => {
      navigate('/admin/players')
      toast.success('Player updated successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update player')
    }
  })

  const {
    data: mvpData,
    isLoading: isMvpLoading,
    isError: isMvpError,
    error: mvpError
  } = useQuery<MvpInfo, Error>({
    queryKey: ['mvp'],
    queryFn: playerService.getMvp,
    staleTime: 1000 * 60 * 1 // 5 dakika boyunca veri taze kabul edilir
  })

  return { players: players.length > 0 ? players : data, isLoading, isError, error, updatePlayer, mvpData, isMvpLoading, isMvpError, mvpError }
}

export default usePlayer
