import useWeather from '../../hooks/useWeather'
import { splitDateTime } from '../../utils/Date/dateUtils'
import Button from '../ui/Button'
import MatchInfo from './MatchInfo'
import homeTeamLogo from '../../assets/images/club-black.svg'
import awayTeamLogo from '../../assets/images/club-white.svg'
import { useNavigate } from 'react-router-dom'
import { Match } from '../../services/matchService'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

import { getWeatherIcon, normalizeWeatherString } from '../../utils/weatherUtils'

type BannerProps = {
  match: Match
}

export default function Banner({ match }: BannerProps) {
  const { hasVoted } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  const { date, time } = splitDateTime(match.dateTime)

  const { weather, loading } = useWeather({ matchDate: date, nextMatchWeather: match.weather, matchId: match.id })

  return (
    <div className={`relative px-4 py-8 overflow-hidden text-sm ${match.played ? 'bg-neutral-dark' : 'bg-primary'} shadow-pixel `}>
      <span className="absolute top-0 left-0 w-3/5 h-full bg-white rounded-tr-full bg-opacity-30 "></span>
      <div className="relative z-10 space-y-6">
        <h2 className={`mb-4 text-white text-center ${match.played ? 'text-xl' : 'text-3xl'}`}>{match.played ? 'Last Match' : 'NEXT MATCH'}</h2>

        {match.played ? (
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <img
                src={homeTeamLogo}
                className="w-20"
              />
            </div>
            <div className="text-2xl text-white">
              <span>{(match?.homeTeamScore > 0 && match.homeTeamScore) || ''}</span>-
              <span>{(match?.awayTeamScore > 0 && match.awayTeamScore) || ''}</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={awayTeamLogo}
                className="w-20"
              />
            </div>
          </div>
        ) : (
          <MatchInfo
            date={date}
            time={time}
            location={match.gameLocation}
          />
        )}

        {loading && !match.played && <p>loading...</p>}

        {!match.played && weather && (
          <div className="flex items-center text-white">
            <img
              src={getWeatherIcon(weather.description)}
              alt={weather.description}
              className="w-12 h-12"
            />
            <span className="ml-2">{normalizeWeatherString(weather.description)}</span>
          </div>
        )}

        <div className="pt-6 text-right">
          {match.played && match.voted ? (
            <Button
              label="Match Detail"
              className="ml-2 text-secondary "
              onClick={() => navigate(`/matches/${match.id}`)}
            />
          ) : (
            <Button
              label={match.played ? (hasVoted ? 'Check voting' : 'Vote teammates') : 'Check lineup'}
              className={match.played ? (hasVoted ? '' : 'text-secondary') : ''}
              animation={match.played && !hasVoted && !match.voted ? 'pulse' : undefined}
              onClick={() => navigate(`/matches/${match.id}`)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
