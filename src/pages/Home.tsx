import Banner from '../components/match/Banner'
import TopLists from '../components/player-lists/TopLists'

import ballIcon from '../assets/icons/ball.png'
import userIcon from '../assets/icons/user.svg'
import ratingIcon from '../assets/icons/coin.svg'
import MvpCard from '../components/player-lists/MvpCard'

const dummyMatch = {
  id: 1,
  location: 'Central Stadium',
  weather: 'Clear',
  homeTeamScore: 1,
  awayTeamScore: 2,
  dateTime: '2024-10-17T23:35:33.957',
  played: true,
  voted: false
}

const dummyPlayerData = [
  {
    icon: userIcon,
    playerName: 'Serkan',
    statistic: '9'
  },
  {
    icon: userIcon,
    playerName: 'Mete',
    statistic: '19'
  },
  {
    icon: userIcon,
    playerName: 'Ismail',
    statistic: '2'
  },
  {
    icon: userIcon,
    playerName: 'Isa',
    statistic: '7'
  }
]

export default function Home() {
  return (
    <div className="space-y-6">
      <Banner match={dummyMatch} />

      <MvpCard />

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
