import Watermark from '../ui/Watermark'
import { useNavigate } from 'react-router-dom'
import { RivalDuos } from '../../types/TopListTypes'
import { Swords } from 'lucide-react'

interface RivalDuosListProps {
  title: string
  statisticLabel: string
  statisticLabelOptional?: string
  watermark: string
  playersData: RivalDuos[]
}

export default function RivalDuosList({ title, statisticLabel, watermark, playersData }: RivalDuosListProps) {
  const navigate = useNavigate()
  return (
    <div className="relative py-4 overflow-hidden bg-white ">
      <Watermark watermarkIcon={watermark} />
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl text-primary-error">{title}</h2>
      </div>
      <div className="flex justify-between items-end mt-6 text-[10px] px-4">
        <span>Players</span>
        <div className="flex items-center space-x-2">
          <span className="w-24 text-right ">{statisticLabel}</span>
        </div>
      </div>

      <>
        {playersData.slice(0, 5).map(player => {
          return (
            <div
              key={player.player1Id}
              className="mr-4 border-b cursor-pointer border-l-neutral-dark last:border-b-0"
            >
              <div className={`flex justify-between py-2 mt-2 text-xs space-x-4 `}>
                <div className="grid justify-center w-3/4 grid-cols-7">
                  <span
                    onClick={() => navigate(`/profile/${player.player1Id}`)}
                    className="flex items-center justify-center col-span-3 text-center "
                  >
                    <span className="font-thin">{player.player1Name}</span>
                  </span>
                  <div className="flex items-center justify-center col-span-1 ">
                    <Swords className="text-red-400 w-7 h-7" />
                  </div>
                  <span
                    onClick={() => navigate(`/profile/${player.player2Id}`)}
                    className="flex items-center justify-center col-span-3"
                  >
                    <span className="font-thin text-center">{player.player2Name}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 ">
                  <span className="w-12 text-center">{player.gamesAgainst}</span>
                </div>
              </div>
            </div>
          )
        })}
      </>
    </div>
  )
}
