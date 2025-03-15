import Watermark from '../ui/Watermark'
import { TopScorer } from '../../services/goalService'

import userIcon from '../../assets/icons/user.svg'
import Icons from '../ui/Icons'

interface TopScorerDetailListProps {
  title: string
  statisticLabel: string
  statisticLabelOptional?: string
  watermark: string
  playersData: TopScorer[]
}

export default function TopScorerDetailList({ title, statisticLabel, watermark, playersData }: TopScorerDetailListProps) {
  return (
    <div className="relative py-4 overflow-hidden bg-white ">
      <Watermark watermarkIcon={watermark} />
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl text-primary">{title}</h2>
      </div>
      <div className="flex justify-between mt-6 text-[10px] px-4">
        <span>Player Name</span>
        <div className="flex items-center space-x-2">
          <span className="w-12 text-center text-neutral-500">Game</span>
          <span className="w-12 text-center">{statisticLabel}</span>
        </div>
      </div>

      <>
        {playersData.slice(0, 10).map(player => {
          return (
            <div className="mr-4 border-b cursor-pointer border-l-neutral-dark last:border-b-0">
              <div className={`flex justify-between py-2 pl-4 mt-2 text-xs `}>
                <span className="flex items-center space-x-2">
                  <Icons src={userIcon} />
                  <span className="font-thin">{player.name.split(' ')[0][0] + '.' + player.surname}</span>
                </span>
                <div className="flex items-center space-x-2">
                  <span className="w-12 text-center text-neutral-500">{player.gameCount}</span>
                  <span className="w-12 text-center">{player.goalCount}</span>
                </div>
              </div>
            </div>
          )
        })}
      </>
    </div>
  )
}
