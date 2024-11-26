import { useNavigate } from 'react-router-dom'
import { Roster } from '../../../types/MatchTypes'

interface SquadListDisplayProps {
  squad: Roster[]
  isVoted: boolean
  currentPlayerId: number
}

export default function SquadListDisplay({ squad, isVoted, currentPlayerId }: SquadListDisplayProps) {
  const navigate = useNavigate()

  return (
    <div className="relative">
      {squad?.map(roster => {
        return (
          <div
            key={roster.id}
            className={`flex justify-between space-y-1 border-b border-gray-300 p-2`}
          >
            <span
              className={`${currentPlayerId === roster.playerId && 'text-accent'}`}
              onClick={() => navigate(`/profile/${roster.playerId}`)}
            >
              {roster.playerName.split(' ')[0][0]}.{roster.playerName.split(' ').pop()}
            </span>

            <span className={`${currentPlayerId === roster.playerId && 'text-accent'}`}>{isVoted && roster.rating.toFixed(1)}</span>
          </div>
        )
      })}
    </div>
  )
}
