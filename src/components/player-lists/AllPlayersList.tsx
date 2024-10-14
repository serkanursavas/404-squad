import { PlayerInfo } from '../../types/PlayerTypes'
import PlayerCard from './PlayerCard'

type PlayersListProps = {
  playersData: PlayerInfo[]
}

export default function AllPlayersList({ playersData }: PlayersListProps) {
  playersData.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1))

  return (
    <div className="flex flex-wrap space-y-5 ">
      {playersData.map(player => {
        return (
          <PlayerCard
            key={player.id}
            player={player}
          />
        )
      })}
    </div>
  )
}
