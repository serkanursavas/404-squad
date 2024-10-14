import Watermark from '../ui/Watermark'

import mvpPic from '../../assets/images/mvp.png'
import starIcon from '../../assets/icons/star.svg'
import { PlayerInfo } from '../../types/PlayerTypes'
import { useNavigate } from 'react-router-dom'

export default function MvpCard({ player }: { player: PlayerInfo }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/profile/${player.id}`)}
      className="relative z-10 p-8 space-y-6 overflow-hidden bg-white cursor-pointer shadow-pixel"
    >
      <Watermark
        watermarkIcon={starIcon}
        watermarksCount={15}
        customOpacity={true}
        rotate
      />
      <div className="relative z-10 space-y-2 ">
        <h2 className="text-xl ">
          {player?.name} {player?.surname}
        </h2>
        <p className="text-[10px] text-neutral-dark">{player?.position}</p>
      </div>
      <div className="flex justify-end pr-10 ">
        <img
          src={mvpPic || player?.photo}
          className="z-10 w-64 "
        />
      </div>
    </div>
  )
}
