import { useParams } from 'react-router-dom'

import { Match } from '../types/MatchTypes'

import homeTeamLogo from '../assets/images/club-black.svg'
import awayTeamLogo from '../assets/images/club-white.svg'
import locationIcon from '../assets/icons/bookmarks.svg'
import dateIcon from '../assets/icons/calendar.svg'
import Icons from '../components/ui/Icons'
import Scoreboard from '../components/match/match-detail/Scoreboard'
import SquadList from '../components/match/match-detail/SquadList'
import { getFormattedDayAndMonth } from '../utils/Date/dateUtils'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect, useState } from 'react'
import useMatches from '../hooks/useMatches'

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)

  const { useMatchDetails } = useMatches()

  // 'id' varsa, maçın detaylarını getiriyoruz
  const match = useMatchDetails(Number(id))

  useEffect(() => {
    if (match) {
      setLoading(false)
    }
  }, [match])

  if (loading) {
    return <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-xl">Loading...</div>
  }

  if (!match) {
    return <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-xl">Match Not Found</div>
  }

  const homeTeamSquad = match.rosters?.filter(player => player.teamColor === 'BLACK')
  const awayTeamSquad = match.rosters?.filter(player => player.teamColor === 'WHITE')

  return (
    <div className="pt-6 border-t border-neutral-dark">
      <div className="w-full text-[12px] items-center justify-between mb-6 tracking-tighter flex text-primary ">
        <div className="flex items-center text-purple-400">
          <Icons src={locationIcon} />
          <span className="ml-1"> {match?.location}</span>
        </div>
        <div className="flex items-center text-right">
          <span className="mr-1"> {getFormattedDayAndMonth(match?.dateTime)}</span>
        </div>
      </div>

      <Scoreboard
        homeTeamScore={match.homeTeamScore}
        awayTeamScore={match.awayTeamScore}
        goals={match.goals}
        played={match.played}
      />

      <div className="px-2 text-[12px] mt-12 space-y-8">
        <SquadList
          teamLogo={homeTeamLogo}
          squad={homeTeamSquad}
          played={match.played}
          isVotingClosed={match.voted}
        />
        <SquadList
          teamLogo={awayTeamLogo}
          squad={awayTeamSquad}
          played={match.played}
          isVotingClosed={match.voted}
        />
      </div>
    </div>
  )
}
