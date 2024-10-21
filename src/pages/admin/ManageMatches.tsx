import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

import MatchCard from '../../components/match/MatchCard'

import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import useMatches from '../../hooks/useMatches'

export default function ManageMatches() {
  useMatches(false, true)
  const nextMatch = useSelector((state: RootState) => state.matches.nextMatch)

  const route = nextMatch?.played ? `/admin/matches/${nextMatch?.id}/add-goals` : `/admin/matches/${nextMatch?.id}`

  return (
    <div>
      {nextMatch ? (
        <MatchCard
          match={nextMatch}
          route={route}
          classname={`${nextMatch.played ? 'bg-secondary ' : 'bg-third text-white'}`}
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
