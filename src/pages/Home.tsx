import Banner from '../components/match/Banner'
import TopLists from '../components/player-lists/TopLists'

import ballIcon from '../assets/icons/ball.png'
import ratingIcon from '../assets/icons/coin.svg'
import MvpCard from '../components/player-lists/MvpCard'
import { PlayerInfo } from '../types/PlayerTypes'
import useMatches from '../hooks/useMatches'

import { useSelector } from 'react-redux'
import { RootState } from '../store'
import useTopLists from '../hooks/useTopLists'

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
  useMatches(false, true)
  const reduxNextMatch = useSelector((state: RootState) => state.matches.nextMatch)

  const { topScorers, topRatedPlayers } = useTopLists()

  return (
    <div className="space-y-6">
      {reduxNextMatch && <Banner match={reduxNextMatch} />}

      <MvpCard player={player} />

      <TopLists
        title="Top Scorer"
        statisticLabel="Goal"
        watermark={ballIcon}
        playersData={topScorers}
      />
      <TopLists
        title="Top Rating"
        statisticLabel="Form"
        watermark={ratingIcon}
        playersData={topRatedPlayers}
      />
    </div>
  )
}
