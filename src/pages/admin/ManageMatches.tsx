import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

import MatchCard from '../../components/match/MatchCard'

import { useState } from 'react'
import useMatches from '../../hooks/useMatches'
import { Match } from '../../services/matchService'

export default function ManageMatches() {
  const { nextMatch } = useMatches()

  const [matchInfo, setMatchInfo] = useState<Match | null>(nextMatch || null)

  const route = matchInfo?.played ? `/admin/matches/${matchInfo.id}/add-goals` : `/admin/matches/${matchInfo?.id}`

  return (
    <div>
      {matchInfo && (matchInfo?.goals ?? []).length === 0 ? (
        <MatchCard
          match={matchInfo}
          route={route}
          classname={`${matchInfo.played ? 'bg-secondary ' : 'bg-third text-white'}`}
        />
      ) : (
        <div className="flex items-center justify-center mt-40">
          <Link to={'/admin/matches/create'}>
            <Button label="Create a Match" />
          </Link>
        </div>
      )}
    </div>
  )
}
