import MatchCard from './MatchCard'

import { MatchInfo } from '../../types/MatchTypes'

type MatchesListProps = {
  matchesData: MatchInfo[]
}

export default function MatchesList({ matchesData }: MatchesListProps) {
  return (
    <>
      {matchesData.map(match => {
        return (
          <MatchCard
            key={match.id}
            match={match}
          />
        )
      })}
    </>
  )
}
