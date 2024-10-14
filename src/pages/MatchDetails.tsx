import { useParams } from 'react-router-dom'

import { Match } from '../types/MatchTypes'

import homeTeamLogo from '../assets/images/club-black.svg'
import awayTeamLogo from '../assets/images/club-white.svg'
import locationIcon from '../assets/icons/bookmarks.svg'
import Icons from '../components/ui/Icons'
import Scoreboard from '../components/match/match-detail/Scoreboard'
import SquadList from '../components/match/match-detail/SquadList'
import { getFormattedDayAndMonth } from '../utils/Date/dateUtils'

const dummyMatches: Match[] = [
  {
    id: 1,
    location: 'Star',
    dateTime: '2024-09-24',
    weather: 'Cloud',
    homeTeamScore: 4,
    awayTeamScore: 5,
    isPlayed: true,
    isVoted: true,
    goals: [
      { playerId: 6, playerName: 'Luke Skywalker', teamColor: 'white' }, // roster'dan alındı
      { playerId: 7, playerName: 'Anakin Skywalker', teamColor: 'black' }, // roster'dan alındı
      { playerId: 6, playerName: 'Luke Skywalker', teamColor: 'white' }, // roster'dan alındı
      { playerId: 7, playerName: 'Anakin Skywalker', teamColor: 'black' }, // roster'dan alındı
      { playerId: 8, playerName: 'Obi-Wan Kenobi', teamColor: 'white' }, // roster'dan alındı
      { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' }, // roster'dan alındı
      { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' }, // roster'dan alındı
      { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' }, // roster'dan alındı
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // roster'dan alındı
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // playerId 11 yok, doğru bilgi alınarak düzeltildi
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // roster'dan alındı
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // playerId 11 yok, doğru bilgi alınarak düzeltildi
      { playerId: 4, playerName: 'Steve Jobs', teamColor: 'white' }, // playerName "John Doe" yanlış, roster'dan "Steve Jobs" alındı
      { playerId: 2, playerName: 'Max Power', teamColor: 'white' }, // roster'dan alındı
      { playerId: 4, playerName: 'Steve Jobs', teamColor: 'white' }, // playerName "John Doe" yanlış, roster'dan "Steve Jobs" alındı
      { playerId: 2, playerName: 'Max Power', teamColor: 'white' }, // roster'dan alındı
      { playerId: 3, playerName: 'Chris Rock', teamColor: 'black' }, // roster'dan alındı
      { playerId: 1, playerName: 'John Doe', teamColor: 'black' } // roster'dan alındı
    ],
    rosters: [
      { id: 1, playerName: 'John Doe', rating: 0, playerId: 1, teamColor: 'black' },
      { id: 2, playerName: 'Max Power', rating: 7, playerId: 2, teamColor: 'white' },
      { id: 3, playerName: 'Chris Rock', rating: 6, playerId: 3, teamColor: 'black' },
      { id: 4, playerName: 'Steve Jobs', rating: 9, playerId: 4, teamColor: 'white' },
      { id: 5, playerName: 'Elon Musk', rating: 5, playerId: 5, teamColor: 'black' },
      { id: 6, playerName: 'Luke Skywalker', rating: 9, playerId: 6, teamColor: 'white' },
      { id: 7, playerName: 'Anakin Skywalker', rating: 8, playerId: 7, teamColor: 'black' },
      { id: 8, playerName: 'Obi-Wan Kenobi', rating: 7, playerId: 8, teamColor: 'white' },
      { id: 9, playerName: 'Leia Organa', rating: 6, playerId: 9, teamColor: 'black' },
      { id: 10, playerName: 'Darth Vader', rating: 10, playerId: 10, teamColor: 'white' }
    ]
  },
  {
    id: 2,
    location: 'Star',
    dateTime: '2024-09-24',
    weather: 'Cloud',
    homeTeamScore: 4,
    awayTeamScore: 5,
    isPlayed: true,
    isVoted: true,
    goals: [
      { playerId: 6, playerName: 'Luke Skywalker', teamColor: 'white' }, // roster'dan alındı
      { playerId: 7, playerName: 'Anakin Skywalker', teamColor: 'black' }, // roster'dan alındı
      { playerId: 6, playerName: 'Luke Skywalker', teamColor: 'white' }, // roster'dan alındı
      { playerId: 7, playerName: 'Anakin Skywalker', teamColor: 'black' }, // roster'dan alındı
      { playerId: 8, playerName: 'Obi-Wan Kenobi', teamColor: 'white' }, // roster'dan alındı
      { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' }, // roster'dan alındı
      { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' }, // roster'dan alındı
      { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' }, // roster'dan alındı
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // roster'dan alındı
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // playerId 11 yok, doğru bilgi alınarak düzeltildi
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // roster'dan alındı
      { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' }, // playerId 11 yok, doğru bilgi alınarak düzeltildi
      { playerId: 4, playerName: 'Steve Jobs', teamColor: 'white' }, // playerName "John Doe" yanlış, roster'dan "Steve Jobs" alındı
      { playerId: 2, playerName: 'Max Power', teamColor: 'white' }, // roster'dan alındı
      { playerId: 4, playerName: 'Steve Jobs', teamColor: 'white' }, // playerName "John Doe" yanlış, roster'dan "Steve Jobs" alındı
      { playerId: 2, playerName: 'Max Power', teamColor: 'white' }, // roster'dan alındı
      { playerId: 3, playerName: 'Chris Rock', teamColor: 'black' }, // roster'dan alındı
      { playerId: 1, playerName: 'John Doe', teamColor: 'black' } // roster'dan alındı
    ],
    rosters: [
      { id: 1, playerName: 'John Doe', rating: 0, playerId: 1, teamColor: 'black' },
      { id: 2, playerName: 'Max Power', rating: 7, playerId: 2, teamColor: 'white' },
      { id: 3, playerName: 'Chris Rock', rating: 6, playerId: 3, teamColor: 'black' },
      { id: 4, playerName: 'Steve Jobs', rating: 9, playerId: 4, teamColor: 'white' },
      { id: 5, playerName: 'Elon Musk', rating: 5, playerId: 5, teamColor: 'black' },
      { id: 6, playerName: 'Luke Skywalker', rating: 9, playerId: 6, teamColor: 'white' },
      { id: 7, playerName: 'Anakin Skywalker', rating: 8, playerId: 7, teamColor: 'black' },
      { id: 8, playerName: 'Obi-Wan Kenobi', rating: 7, playerId: 8, teamColor: 'white' },
      { id: 9, playerName: 'Leia Organa', rating: 6, playerId: 9, teamColor: 'black' },
      { id: 10, playerName: 'Darth Vader', rating: 10, playerId: 10, teamColor: 'white' }
    ]
  }
]

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>()

  const match = dummyMatches.find(match => match.id === Number(id))

  if (!match) {
    return <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-xl">Match Not Found</div>
  }

  const homeTeamSquad = match.rosters.filter(player => player.teamColor === 'black')
  const awayTeamSquad = match.rosters.filter(player => player.teamColor === 'white')

  return (
    <div className="pt-6 border-t border-neutral-dark">
      <div className="w-full text-[12px] items-center mb-6 tracking-tighter flex justify-between  text-primary">
        <div className="flex items-center space-x-1 text-purple-400 ">
          <Icons src={locationIcon} /> <span>{match.location}</span>
        </div>
        <div className="text-xs">{getFormattedDayAndMonth(match?.dateTime)}</div>
      </div>

      <Scoreboard
        homeTeamScore={match.homeTeamScore}
        awayTeamScore={match.awayTeamScore}
        goals={match.goals}
        isPlayed={match.isPlayed}
      />

      <div className="px-2 text-[12px] mt-12 space-y-8">
        <SquadList
          teamLogo={homeTeamLogo}
          squad={homeTeamSquad}
          isPlayed={match.isPlayed}
          isVotingClosed={match.isVoted}
        />
        <SquadList
          teamLogo={awayTeamLogo}
          squad={awayTeamSquad}
          isPlayed={match.isPlayed}
          isVotingClosed={match.isVoted}
        />
      </div>
    </div>
  )
}
