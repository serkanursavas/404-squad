import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

import MatchCard from '../../components/match/MatchCard'

import { useState } from 'react'
import { Match } from '../../types/MatchTypes'

const dummyMatch: Match = {
  id: 1,
  location: 'Star',
  dateTime: '2024-09-24',
  weather: 'Cloud',
  homeTeamScore: 4,
  awayTeamScore: 5,
  played: true,
  voted: false,
  goals: [
    { playerId: 6, playerName: 'Luke Skywalker', teamColor: 'white' },
    { playerId: 7, playerName: 'Anakin Skywalker', teamColor: 'black' },
    { playerId: 6, playerName: 'Luke Skywalker', teamColor: 'white' },
    { playerId: 7, playerName: 'Anakin Skywalker', teamColor: 'black' },
    { playerId: 8, playerName: 'Obi-Wan Kenobi', teamColor: 'white' },
    { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' },
    { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' },
    { playerId: 9, playerName: 'Leia Organa', teamColor: 'black' },
    { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' },
    { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' },
    { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' },
    { playerId: 10, playerName: 'Darth Vader', teamColor: 'white' },
    { playerId: 4, playerName: 'Steve Jobs', teamColor: 'white' },
    { playerId: 2, playerName: 'Max Power', teamColor: 'white' },
    { playerId: 4, playerName: 'Steve Jobs', teamColor: 'white' },
    { playerId: 2, playerName: 'Max Power', teamColor: 'white' },
    { playerId: 3, playerName: 'Chris Rock', teamColor: 'black' },
    { playerId: 1, playerName: 'John Doe', teamColor: 'black' }
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

export default function ManageMatches() {
  const [matchInfo, setMatchInfo] = useState<Match | null>(dummyMatch)

  const route = matchInfo?.played ? `/admin/matches/${matchInfo.id}/add-goals` : `/admin/matches/${matchInfo?.id}`

  return (
    <div>
      {matchInfo ? (
        <MatchCard
          match={matchInfo}
          route={route}
        />
      ) : (
        <div className="flex items-center justify-center mt-40">
          <Link to={'/admin/matches/create'}>
            <Button label="Create a Match" />
          </Link>
        </div>
      )}
    </div>
  )
}
