import Banner from '../components/match/Banner'
import TopLists from '../components/player-lists/TopLists'

import ballIcon from '../assets/icons/ball.png'
import ratingIcon from '../assets/icons/coin.svg'
import MvpCard from '../components/player-lists/MvpCard'

import useMatches from '../hooks/useMatches'

import { useSelector } from 'react-redux'
import { RootState } from '../store'
import useTopLists from '../hooks/useTopLists'
import usePlayer from '../hooks/usePlayers'

export default function Home() {
  useMatches(false, true)
  const reduxNextMatch = useSelector((state: RootState) => state.matches.nextMatch)

  const { topScorers, topRatedPlayers } = useTopLists()

  const { mvpData, isMvpLoading, isMvpError } = usePlayer()

  return (
    <div className="space-y-6">
      {reduxNextMatch && <Banner match={reduxNextMatch} />}

      {mvpData && <MvpCard player={mvpData} />}

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
