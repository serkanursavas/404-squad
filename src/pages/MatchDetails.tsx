import { useParams } from 'react-router-dom'

import { Match } from '../types/MatchTypes'

import { getDayOfWeek } from '../utils/dateUtils'

import blackLogo from '../assets/images/club-black.svg'
import whiteLogo from '../assets/images/club-white.svg'
import locationIcon from '../assets/icons/bookmarks.svg'
import Icons from '../components/ui/Icons'
import Scoreboard from '../components/match/match-detail/Scoreboard'
import SquadList from '../components/match/match-detail/SquadList'

const dummyMatches: Match[] = [
  {
    id: 1,
    date: '2024-09-24',
    location: 'Star',
    isPlayed: false,
    voteMode: true,
    team1: {
      name: 'Black Eagles',
      logo: blackLogo,
      score: 4,
      goals: [
        { id: 4, playerName: 'John Doe' },
        { id: 2, playerName: 'Max Power' },
        { id: 3, playerName: 'Chris Rock' },
        { id: 1, playerName: 'John Doe' }
      ],
      players: [
        { id: 1, name: 'John Doe', form: 0 },
        { id: 2, name: 'Max Power', form: 7 },
        { id: 3, name: 'Chris Rock', form: 6 },
        { id: 4, name: 'Steve Jobs', form: 9 },
        { id: 5, name: 'Elon Musk', form: 5 }
      ]
    },
    team2: {
      name: 'White Wolves',
      logo: whiteLogo,
      score: 6,
      goals: [
        { id: 6, playerName: 'Luke Skywalker' },
        { id: 7, playerName: 'Anakin Skywalker' },
        { id: 8, playerName: 'Obi-Wan Kenobi' },
        { id: 9, playerName: 'Leia Organa' },
        { id: 10, playerName: 'Darth Vader' },
        { id: 11, playerName: 'Darth Vader' }
      ],
      players: [
        { id: 6, name: 'Luke Skywalker', form: 9 },
        { id: 7, name: 'Anakin Skywalker', form: 8 },
        { id: 8, name: 'Obi-Wan Kenobi', form: 7 },
        { id: 9, name: 'Leia Organa', form: 6 },
        { id: 10, name: 'Darth Vader', form: 10 }
      ]
    }
  },
  {
    id: 2,
    date: '2024-07-11',
    location: 'Şirin',
    isPlayed: true,
    voteMode: true,
    team1: {
      name: 'Red Bulls',
      logo: whiteLogo,
      score: 2,
      goals: [
        { id: 12, playerName: 'Lionel Messi' },
        { id: 13, playerName: 'Cristiano Ronaldo' }
      ],
      players: [
        { id: 12, name: 'Lionel Messi', form: 8 },
        { id: 13, name: 'Cristiano Ronaldo', form: 9 },
        { id: 14, name: 'Neymar Jr', form: 7 },
        { id: 15, name: 'Kylian Mbappe', form: 6 },
        { id: 16, name: 'Luis Suarez', form: 5 }
      ]
    },
    team2: {
      name: 'Blue Sharks',
      logo: blackLogo,
      score: 3,
      goals: [
        { id: 17, playerName: 'Sergio Ramos' },
        { id: 18, playerName: 'Kevin De Bruyne' },
        { id: 19, playerName: 'Zlatan Ibrahimovic' }
      ],
      players: [
        { id: 17, name: 'Sergio Ramos', form: 7 },
        { id: 18, name: 'Kevin De Bruyne', form: 9 },
        { id: 19, name: 'Zlatan Ibrahimovic', form: 10 },
        { id: 20, name: 'David Beckham', form: 8 },
        { id: 21, name: 'Ronaldinho', form: 6 }
      ]
    }
  },
  {
    id: 3,
    date: '2024-05-04',
    location: 'Türkan Saylan',
    isPlayed: true,
    voteMode: true,
    team1: {
      name: 'Green Tigers',
      logo: whiteLogo,
      score: 1,
      goals: [{ id: 22, playerName: 'David Silva' }],
      players: [
        { id: 22, name: 'David Silva', form: 7 },
        { id: 23, name: 'Andres Iniesta', form: 8 },
        { id: 24, name: 'Xavi Hernandez', form: 7 },
        { id: 25, name: 'Gerard Pique', form: 6 },
        { id: 26, name: 'Sergio Busquets', form: 5 }
      ]
    },
    team2: {
      name: 'Yellow Lions',
      logo: blackLogo,
      score: 1,
      goals: [{ id: 27, playerName: 'Thierry Henry' }],
      players: [
        { id: 27, name: 'Thierry Henry', form: 9 },
        { id: 28, name: 'Patrick Vieira', form: 8 },
        { id: 29, name: 'Robert Pires', form: 7 },
        { id: 30, name: 'Freddie Ljungberg', form: 6 },
        { id: 31, name: 'Dennis Bergkamp', form: 10 }
      ]
    }
  }
]

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>()

  const match = dummyMatches.find(match => match.id === Number(id))

  if (!match) {
    return (
      <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-xl">
        Match Not Found
      </div>
    )
  }

  return (
    <div className="pt-6 border-t border-neutral-dark">
      <div className="w-full text-[12px] items-center mb-6 tracking-tighter flex justify-between  text-primary">
        <div className="flex items-center space-x-1 text-purple-400 ">
          <Icons src={locationIcon} /> <span>{match.location}</span>
        </div>
        <div className="text-xs">{getDayOfWeek(match?.date)}</div>
      </div>

      <Scoreboard
        team1={match.team1}
        team2={match.team2}
        isPlayed={match.isPlayed}
      />

      <div className="px-2 text-[12px] mt-12 space-y-8">
        <SquadList
          teamLogo={match.team1.logo}
          squad={match.team1.players}
          isPlayed={match.isPlayed}
          voteMode={match.voteMode}
        />
        <SquadList
          teamLogo={match.team2.logo}
          squad={match.team2.players}
          isPlayed={match.isPlayed}
          voteMode={match.voteMode}
        />
      </div>
    </div>
  )
}
