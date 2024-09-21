import Watermark from '../ui/Watermark'

import mvpPic from '../../assets/images/mvp.png'
import starIcon from '../../assets/icons/star.svg'

export default function MvpCard() {
  return (
    <div className="relative z-10 p-8 space-y-6 overflow-hidden bg-white">
      <Watermark
        watermarkIcon={starIcon}
        watermarksCount={15}
        customOpacity={true}
        rotate
      />
      <div className="relative z-10 space-y-2 ">
        <h2 className="text-xl ">Frenkie De Jong</h2>
        <p className="text-[10px] text-neutral-dark">Attacking Midfielder</p>
      </div>
      <div className="flex justify-end pr-10 ">
        <img
          src={mvpPic}
          className="z-10 w-56 "
        />
      </div>
    </div>
  )
}
