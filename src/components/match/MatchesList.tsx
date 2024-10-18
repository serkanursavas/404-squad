import { Match } from '../../services/matchService'
import MatchCard from './MatchCard'

type MatchesListProps = {
  matchesData: Match[]
}

export default function MatchesList({ matchesData }: MatchesListProps) {
  const activeMatches = matchesData?.filter(match => match.played)

  return (
    <>
      {activeMatches?.map(match => {
        return (
          <MatchCard
            key={match.id}
            match={match}
            route={`/matches/${match.id}`}
          />
        )
      })}
    </>
  )
}
