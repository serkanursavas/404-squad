import { AllMatch } from '../../types/MatchTypes'
import MatchCard from './MatchCard'

type MatchesListProps = {
  matchesData: AllMatch[]
}

export default function MatchesList({ matchesData }: MatchesListProps) {
  return (
    <>
      {matchesData?.map(match => {
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
