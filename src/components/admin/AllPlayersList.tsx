import { Player } from '../../services/playerService'
import PlayerCard from './PlayerCard'

export default function AllPlayersList({ playersData }: { playersData: Player[] }) {
  return (
    <div className="mx-auto mt-3 text-center md:w-10/12">
      <h1 className="text-2xl text-neutral-dark ">Manage Players</h1>
      <table className="w-full mt-4 border-separate table-auto">
        <thead className="text-base text-primary">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 border min-w-48"
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
