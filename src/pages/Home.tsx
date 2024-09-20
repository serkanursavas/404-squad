import Banner from '../components/match/Banner'
import TopLists from '../components/player-lists/TopLists'

import ballIcon from '../assets/icons/ball.svg'
import userIcon from '../assets/icons/user.svg'
import ratingIcon from '../assets/icons/coin.svg'

const dummyMatch = {
  date: 'Monday',
  time: '18:00',
  location: 'Star Stadium'
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
