import { useState } from 'react'
import useWeather from '../../hooks/useWeather'
import { splitDateTime } from '../../utils/Date/dateUtils'
import Button from '../ui/Button'
import MatchInfo from './MatchInfo'
import homeTeamLogo from '../../assets/images/club-black.svg'
import awayTeamLogo from '../../assets/images/club-white.svg'
import { useNavigate } from 'react-router-dom'

interface MatchInfo {
  id: number
  location: string
  weather: string
  homeTeamScore: number
  awayTeamScore: number
  dateTime: string
  played: boolean
  voted: boolean
}

type BannerProps = {
  match: MatchInfo
}

export default function Banner({ match }: BannerProps) {
  const [hasVoted, setHasVoted] = useState(true) // backend api hazirlanacak rating sorgusu ile contexapi

  const navigate = useNavigate()

  const { date, time } = splitDateTime(match.dateTime)

  const { weather, loading, error } = useWeather(date)

  return (
    <div className={`relative px-4 py-8 overflow-hidden text-sm ${match.played ? 'bg-neutral-dark' : 'bg-primary'} shadow-pixel `}>
      <span className="absolute top-0 left-0 w-3/5 h-full bg-white rounded-tr-full bg-opacity-30 "></span>
      <div className="relative z-10 space-y-6">
        <h2 className={`mb-4 text-white text-center ${match.played ? 'text-xl' : 'text-3xl'}`}>{match.played ? 'Last Match' : 'NEXT MATCH'}</h2>

        {match.played ? (
          <div className="flex items-center justify-between px-10">
            <div className="flex items-center space-x-2">
              <img
                src={homeTeamLogo}
                className="w-20"
              />
            </div>
            <div className="text-2xl text-white">
              <span>{match.homeTeamScore}</span>-<span>{match.awayTeamScore}</span>
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
            location={match.location}
          />
        )}

        {loading && !match.played && <p>loading...</p>}

        {!match.played && weather && (
          <div className="flex items-center text-white">
            <img
              src={weather.icon}
              alt={weather.description}
              className="w-12 h-12"
            />
            <span>{weather.description}</span>
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
