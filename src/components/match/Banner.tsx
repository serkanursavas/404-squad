import useWeather from '../../hooks/useWeather'
import Button from '../ui/Button'
import MatchInfo from './MatchInfo'

interface MatchInfo {
  date: string
  time: string
  location: string
}

type BannerProps = {
  match: MatchInfo
}

export default function Banner({ match }: BannerProps) {
  const { weather, loading, error } = useWeather(match.date)

  return (
    <div className="relative px-4 py-8 overflow-hidden text-sm shadow-lg bg-primary">
      <span className="absolute top-0 left-0 w-3/5 h-full bg-white rounded-tr-full bg-opacity-30 "></span>
      <div className="relative z-10 space-y-6">
        <h2 className="mb-4 text-3xl text-center text-white">NEXT MATCH</h2>

        <MatchInfo
          date={match.date}
          time={match.time}
          location={match.location}
        />

        {weather && (
          <div className="flex items-center text-white">
            <img
              src={weather.icon}
              alt={weather.description}
              className="w-12 h-12"
            />
            <span>{weather.description}</span>
          </div>
        )}

        <div className="text-right">
          <Button label="Match Details" />
        </div>
      </div>
    </div>
  )
}
