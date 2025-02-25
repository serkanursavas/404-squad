import CardWrapper from './CardWrapper'

import homeTeamLogo from '../../assets/images/club-black.svg'
import awayTeamLogo from '../../assets/images/club-white.svg'
import { getFormattedDayAndMonth, splitDateTime } from '../../utils/Date/dateUtils'
import { Match } from '../../services/matchService'

type MatchInfoProps = {
  match: Match
  route: string
  classname?: string
}

export default function MatchCard({ match, route, classname = 'bg-white' }: MatchInfoProps) {
  const { date } = splitDateTime(match.dateTime)

  return (
    <CardWrapper
      route={route}
      classname={`${classname}`}
    >
      <div className="text-right text-[10px] text-neutral-dark">{getFormattedDayAndMonth(date)}</div>
      <div className={`flex  items-center justify-around xs:justify-between  ${match.id % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex items-center gap-4  ${match.id % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="hidden xs:block">Black</span>
          <img
            src={homeTeamLogo}
            className="w-12"
          />
        </div>
        <div className={`flex  text-base ${match.id % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
          <span>{match?.homeTeamScore > 0 && match.homeTeamScore}</span>-<span>{match?.awayTeamScore > 0 && match.awayTeamScore}</span>
        </div>
        <div className={`flex items-center gap-4  ${match.id % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
          <img
            src={awayTeamLogo}
            className="w-12"
          />
          <span className="hidden xs:block">White</span>
        </div>
      </div>
    </CardWrapper>
  )
}
