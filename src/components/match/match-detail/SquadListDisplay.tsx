import { useNavigate } from 'react-router-dom'
import { Player } from '../../../types/MatchTypes'

interface SquadListDisplayProps {
  squad: Player[]
  isPlayed: boolean
}

export default function SquadListDisplay({ squad, isPlayed }: SquadListDisplayProps) {
  const navigate = useNavigate()

  return (
    <div className="relative">
      {squad?.map(player => {
        return (
          <div
            key={player.id}
            className={`flex justify-between space-y-1 border-b border-gray-300 p-2`}
          >
            <span onClick={() => navigate(`/profile/${player.id}`)}>{player.name}</span>

            <span>{isPlayed && player.form}</span>
          </div>
        )
      })}
    </div>
  )
}
