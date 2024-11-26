import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import homeTeamLogo from '../assets/images/club-black.svg'
import awayTeamLogo from '../assets/images/club-white.svg'
import locationIcon from '../assets/icons/bookmarks.svg'
import Icons from '../components/ui/Icons'
import Scoreboard from '../components/match/match-detail/Scoreboard'
import SquadList from '../components/match/match-detail/SquadList'
import { getFormattedDayAndMonth } from '../utils/Date/dateUtils'
import { useEffect, useState } from 'react'
import useMatches from '../hooks/useMatches'
import sunnySvg from '../assets/icons/sun.png'
import rainSvg from '../assets/icons/rain.svg'
import cloudsSvg from '../assets/icons/clouds.png'
import brokenCloudsSvg from '../assets/icons/broken_clouds.png'
import scatteredCloudsSvg from '../assets/icons/scattered_clodus.png'
import showerRainSvg from '../assets/icons/shower_rain.png'
import thunderstormSvg from '../assets/icons/thunderstorm.png'

import PixelSpinner from '../components/ui/PixelSpinner'

function getWeatherIcon(weather: string): string {
  const weatherIcons: { [key: string]: string } = {
    'clear sky': sunnySvg,
    rain: rainSvg,
    'few clouds': cloudsSvg,
    'broken clouds': brokenCloudsSvg,
    'scattered clouds': scatteredCloudsSvg,
    'shower rain': showerRainSvg,
    thunderstorm: thunderstormSvg
  }

  return weatherIcons[weather] || cloudsSvg // Default ikon
}

function normalizeWeatherString(weather: string): string {
  const weatherMap: { [key: string]: string } = {
    'clear sky': 'Sunny',
    rain: 'Rainy',
    'few clouds': 'Partly Cloudy',
    'broken clouds': 'Mostly Cloudy',
    'scattered clouds': 'Scattered Clouds',
    'shower rain': 'Light Showers',
    thunderstorm: 'Thunderstorms'
  }

  return weatherMap[weather] || weather // Default: Orijinal değeri döner
}

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const { useMatchDetails } = useMatches()

  // Maç detaylarını alıyoruz
  const match = useMatchDetails(Number(id))

  useEffect(() => {
    if (match && match.rosters) {
      setLoading(false)
    }
  }, [match])

  if (loading || !match?.rosters) {
    return (
      <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-screen h-screen">
        <PixelSpinner />
      </div>
    )
  }

  if (!match) {
    return <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-xl">Match Not Found</div>
  }

  const homeTeamSquad = match.rosters.filter(player => player.teamColor === 'BLACK')
  const awayTeamSquad = match.rosters.filter(player => player.teamColor === 'WHITE')

  // Ana container ve içerikler için animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 // Her bileşen arasında gecikme
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.div
      className="pt-6 border-t border-neutral-dark"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Maç Bilgileri */}
      <motion.div
        className="mb-6 tracking-tighter text-primary text-[12px] space-y-2"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-purple-400">
            <Icons src={locationIcon} />
            <span className="ml-1">{match.location}</span>
          </div>

          <div className="flex items-center text-right">
            <span className="mr-1">{getFormattedDayAndMonth(match.dateTime)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full px-2 shadow-lg bg-opacity-70 bg-third">
          <Icons
            src={getWeatherIcon(match.weather)}
            className={`${match.weather === 'clear sky' ? 'w-6 py-1' : 'w-8'}`}
          />
          <span className="ml-2 tracking-widest text-white capitalize">{normalizeWeatherString(match.weather)}</span>
        </div>
      </motion.div>

      {/* Scoreboard */}
      <motion.div variants={itemVariants}>
        <Scoreboard
          homeTeamScore={match.homeTeamScore}
          awayTeamScore={match.awayTeamScore}
          goals={match.goals}
          played={match.played}
          twist={match.id % 2 === 0}
        />
      </motion.div>

      {/* Squad Lists */}
      <motion.div
        className={`flex flex-col px-2 text-[12px] mt-12 gap-y-8 ${match.id % 2 === 0 ? 'flex-col-reverse space-y-0' : 'flex-col '}`}
        variants={itemVariants}
      >
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
      </motion.div>
    </motion.div>
  )
}
