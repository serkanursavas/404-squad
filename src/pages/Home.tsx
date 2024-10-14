import Banner from '../components/match/Banner'
import TopLists from '../components/player-lists/TopLists'

import ballIcon from '../assets/icons/ball.png'
import ratingIcon from '../assets/icons/coin.svg'
import MvpCard from '../components/player-lists/MvpCard'
import { PlayerInfo } from '../types/PlayerTypes'

const dummyMatch = {
  id: 1,
  location: 'Central Stadium',
  weather: 'Clear',
  homeTeamScore: 1,
  awayTeamScore: 2,
  dateTime: '2024-10-17T23:35:33.957',
  played: false,
  voted: false
}

const dummyPlayerData = [
  {
    playerId: 1,
    playerName: 'Serkan',
    statistic: '9'
  },
  {
    playerId: 2,
    playerName: 'Mete',
    statistic: '19'
  },
  {
    playerId: 3,
    playerName: 'Ismail',
    statistic: '2'
  },
  {
    playerId: 4,
    playerName: 'Isa',
    statistic: '7'
  }
]

const player: PlayerInfo = {
  id: 1,
  name: 'John',
  surname: 'Doe',
  foot: 'Right',
  photo: 'https://example.com/photo.jpg',
  position: 'Forward',
  active: true,
  rating: 9.5
}

export default function Home() {
  return (
    <div className="space-y-6">
      <Banner match={dummyMatch} />

      <MvpCard player={player} />

      <TopLists
        title="Top Scorer"
        statisticLabel="Goal"
        watermark={ballIcon}
        playersData={dummyPlayerData}
      />
      <TopLists
        title="Top Rating"
        statisticLabel="Form"
        watermark={ratingIcon}
        playersData={dummyPlayerData}
      />
    </div>
  )
}
