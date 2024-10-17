import playerPicture from '../assets/images/player.svg'
import playerFoot from '../assets/icons/foot.svg'
import playerRaiting from '../assets/icons/starAlt.svg'
import playerPosition from '../assets/icons/position.svg'
import playerNumber from '../assets/icons/number.svg'
import PlayerInfoItem from '../components/profile/PlayerInfoItem'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import playerService, { Player } from '../services/playerService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export default function Profile() {
  const { id } = useParams()
  const [player, setPlayer] = useState<Player | null>(null)
  const { players } = useSelector((state: RootState) => state.players)

  const playerId = id ? parseInt(id) : 0

  const playerFromRedux = useMemo(() => {
    return players?.find(player => player.id === playerId)
  }, [id, players])

  const { data: playerFromAPI } = useQuery<Player, Error>({
    queryKey: ['player', playerId],
    queryFn: () => playerService.getPlayerById(playerId),
    enabled: !playerFromRedux
  })

  useEffect(() => {
    if (playerFromRedux) {
      setPlayer(playerFromRedux)
    } else if (playerFromAPI) {
      setPlayer(playerFromAPI)
    }
  }, [playerFromRedux, playerFromAPI])

  return (
    <div className="relative flex flex-col items-center justify-center space-y-8 ">
      <div className={`relative flex flex-col items-center w-full px-12 pt-16 ${!player?.active ? 'grayscale ' : ''}`}>
        <div className="absolute w-screen h-full -mt-20 bg-gradient-to-t from-primary to-neutral opacity-80"></div>
        <img
          src={playerPicture}
          className={`z-10 w-48 ${!player?.active ? '' : ''}`}
          alt="player Photo"
        />
        <div
          className={`z-10 w-full py-2 text-center ${!player?.active ? 'bg-gray-300  text-gray-500' : 'bg-white text-primary'} shadow-custom-dark`}
        >
          {player?.name} {player?.surname}
        </div>
      </div>

      <div className="grid items-center w-full grid-cols-2 gap-6 p-4 mx-2 h-80 justify-items-center ">
        <PlayerInfoItem
          text={String(player?.id)}
          icon={playerNumber}
        />
        <PlayerInfoItem
          text={String(player?.rating)}
          icon={playerRaiting}
        />
        <PlayerInfoItem
          text={player?.position || ''}
          icon={playerPosition}
        />
        <PlayerInfoItem
          text={player?.foot || ''}
          icon={playerFoot}
        />
      </div>
    </div>
  )
}
