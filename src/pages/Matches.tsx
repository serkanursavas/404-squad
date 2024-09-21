import MatchesList from '../components/match/MatchesList'

import blackLogo from '../assets/images/club-black.svg'
import whiteLogo from '../assets/images/club-white.svg'
import TypingEffect from '../components/ui/TypingEffect'

const dummyMatchInfo = [
  {
    id: 1,
    date: 'Monday, 24 September',
    team1: {
      name: 'Black',
      logo: blackLogo
    },
    score1: 4,
    team2: {
      name: 'White',
      logo: whiteLogo
    },
    score2: 6
  },
  {
    id: 2,
    date: 'Wednesday, 11 July',
    team1: {
      name: 'White',
      logo: whiteLogo
    },
    score1: 2,
    team2: {
      name: 'Black',
      logo: blackLogo
    },
    score2: 9
  },
  {
    id: 3,
    date: 'Monday, 24 September',
    team1: {
      name: 'Black',
      logo: blackLogo
    },
    score1: 4,
    team2: {
      name: 'White',
      logo: whiteLogo
    },
    score2: 6
  },
  {
    id: 4,
    date: 'Tuesday, 4 May',
    team1: {
      name: 'Black',
      logo: blackLogo
    },
    score1: 9,
    team2: {
      name: 'White',
      logo: whiteLogo
    },
    score2: 11
  }
]

export default function Matches() {
  return (
    <div className="space-y-6">
      <TypingEffect
        text={['Latest Matches']}
        className="text-sm text-purple-400 "
      />
      <MatchesList matchesData={dummyMatchInfo} />
    </div>
  )
}
