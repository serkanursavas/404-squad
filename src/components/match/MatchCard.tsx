import { useNavigate } from 'react-router-dom'
import { MatchInfo } from '../../types/MatchTypes'

type MatchInfoProps = {
  match: MatchInfo
}

export default function MatchCard({ match }: MatchInfoProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/matches/${match.id}`)}
      className="p-4 space-y-4 text-sm bg-white border-2 border-black cursor-pointer shadow-pixel "
    >
      <div className="text-right text-[10px] text-neutral-dark">{match.date}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>{match.team1.name}</span>
          <img
            src={match.team1.logo}
            className="w-12"
          />
        </div>
        <div className="text-base">
          <span>{match.score1}</span>-<span>{match.score2}</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={match.team2.logo}
            className="w-12"
          />
          <span>{match.team2.name}</span>
        </div>
      </div>
    </div>
  )
}
