import Watermark from '../ui/Watermark'

import mvpPic from '../../assets/images/mvp.png'
import unknownPicture from '../../assets/images/unknown-player.png'
import starIcon from '../../assets/icons/star.svg'
import { useNavigate } from 'react-router-dom'
import { MvpInfo } from '../../services/playerService'

import '../../index.css'

export default function MvpCard({ player }: { player: MvpInfo }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/profile/${player.id}`)}
      className="relative z-10 px-8 pt-8 space-y-8 overflow-hidden bg-white cursor-pointer shadow-pixel"
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
      <div className="flex justify-end pr-4 ">
        <img
          src={unknownPicture || player?.photo}
          className="z-10 w-60 pixelated-effect"
        />
      </div>
    </div>
  )
}
