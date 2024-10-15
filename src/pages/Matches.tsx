import MatchesList from '../components/match/MatchesList'

import TypingEffect from '../components/ui/TypingEffect'
import { AllMatch } from '../types/MatchTypes'

const matches: AllMatch[] = [
  {
    id: 1,
    dateTime: '2024-10-14T22:49:03.696Z',
    homeTeamScore: 0,
    awayTeamScore: 0,
    played: true
  },
  {
    id: 2,
    dateTime: '2024-10-15T18:30:00.000Z',
    homeTeamScore: 2,
    awayTeamScore: 1,
    played: true
  },
  {
    id: 3,
    dateTime: '2024-10-16T20:45:00.000Z',
    homeTeamScore: 3,
    awayTeamScore: 3,
    played: false
  },
  {
    id: 4,
    dateTime: '2024-10-17T21:00:00.000Z',
    homeTeamScore: 1,
    awayTeamScore: 2,
    played: false
  },
  {
    id: 5,
    dateTime: '2024-10-18T19:00:00.000Z',
    homeTeamScore: 4,
    awayTeamScore: 0,
    played: true
  }
]

export default function Matches() {
  return (
    <div className="space-y-6">
      <TypingEffect
        text={['Latest Matches']}
        className="text-sm text-purple-400 "
      />
      <MatchesList matchesData={matches} />
    </div>
  )
}
