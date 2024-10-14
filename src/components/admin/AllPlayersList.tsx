import { PlayerInfo } from '../../types/PlayerTypes'
import PlayerCard from './PlayerCard'

type PlayersListProps = {
  playersData: PlayerInfo[]
}

export default function AllPlayersList({ playersData }: PlayersListProps) {
  return (
    <div className="mx-auto mt-3 text-center md:w-10/12">
      <h1 className="text-2xl text-neutral-dark ">Manage Players</h1>
      <table className="w-full mt-4 border-separate table-auto">
        <thead className="text-base text-primary">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 border"
            >
              Surname
            </th>

            <th
              scope="col"
              className="px-4 py-2 border"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-neutral-dark ">
          {playersData.map(player => {
            return (
              <PlayerCard
                key={player.id}
                player={player}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
