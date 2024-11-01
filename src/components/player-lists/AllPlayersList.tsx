import { Player } from '../../services/playerService'
import PlayerCard from './PlayerCard'

export default function AllPlayersList({ playersData }: { playersData: Player[] }) {
  const sortedPlayersData = playersData.map(player => player).sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1))

  return (
    <div className="flex flex-wrap space-y-5">
      {sortedPlayersData.map((player, index) => (
        <PlayerCard
          key={player.id}
          player={player}
          index={index} // index değerini geçiyoruz
        />
      ))}
    </div>
  )
}
