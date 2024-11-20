import PlayerList from './PlayerList'
import Watermark from '../ui/Watermark'
import { TopPlayer } from '../../services/goalService'
import { Link } from 'react-router-dom'

interface TopListsProps {
  title: string
  statisticLabel: string
  watermark: string
  playersData: TopPlayer[]
}

export default function TopLists({ title, statisticLabel, watermark, playersData }: TopListsProps) {
  return (
    <div className="relative py-4 overflow-hidden bg-white ">
      <Watermark watermarkIcon={watermark} />
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl text-primary">{title}</h2>
        <Link
          to={statisticLabel === 'Form' ? '/players' : '/'}
          className="text-[12px] text-purple-400"
        >
          See All
        </Link>
      </div>

      <div className="flex justify-between mt-6 text-[12px] px-4">
        <span>Player Name</span>
        <span>{statisticLabel}</span>
      </div>

      <PlayerList players={playersData} />
    </div>
  )
}
