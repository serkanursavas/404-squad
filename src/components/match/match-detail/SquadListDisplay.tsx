import { useNavigate } from 'react-router-dom'
import { Roster } from '../../../types/MatchTypes'

interface SquadListDisplayProps {
  squad: Roster[]
  isVoted: boolean
}

export default function SquadListDisplay({ squad, isVoted }: SquadListDisplayProps) {
  const navigate = useNavigate()

  return (
    <div className="relative">
      {squad?.map(roster => {
        return (
          <div
            key={roster.id}
            className={`flex justify-between space-y-1 border-b border-gray-300 p-2`}
          >
            <span onClick={() => navigate(`/profile/${roster.id}`)}>
              {roster.playerName.split(' ')[0][0]}.{roster.playerName.split(' ').pop()}
            </span>

            <span>{isVoted && roster.rating}</span>
          </div>
        )
      })}
    </div>
  )
}
