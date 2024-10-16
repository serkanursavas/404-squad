import { useMutation, useQuery } from '@tanstack/react-query'
import { Player, UpdatePlayerData } from '../services/playerService'
import playerService from '../services/playerService'
import { useDispatch } from 'react-redux'
import { fetchPlayersSuccess } from '../store/playerSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const usePlayer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery<Player[], Error>({
    queryKey: ['players'],
    queryFn: playerService.getAllPlayers
  })

  useEffect(() => {
    if (data) {
      dispatch(fetchPlayersSuccess({ players: data }))
    }
  }, [data])

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

  return { players: data, isLoading, isError, error, updatePlayer }
}

export default usePlayer
