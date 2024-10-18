import Banner from '../components/match/Banner'
import TopLists from '../components/player-lists/TopLists'

import ballIcon from '../assets/icons/ball.png'
import ratingIcon from '../assets/icons/coin.svg'
import MvpCard from '../components/player-lists/MvpCard'
import { PlayerInfo } from '../types/PlayerTypes'
import useMatches from '../hooks/useMatches'

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
  const { nextMatch, isError, isLoading } = useMatches()

  return (
    <div className="space-y-6">
      {isError && <p>Error loading match data.</p>}
      {isLoading && <p>Loading next match...</p>}
      {!isLoading && !isError && nextMatch && <Banner match={nextMatch} />}

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
