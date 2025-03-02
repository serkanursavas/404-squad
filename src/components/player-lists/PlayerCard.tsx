import unknownPicture from '../../assets/images/unknown-player.png'
import starIcon from '../../assets/icons/starAlt.svg'
import { PlayerInfo } from '../../types/PlayerTypes'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

type PlayersListProps = {
  player: PlayerInfo
  index: number
}

export default function PlayerCard({ player, index }: PlayersListProps) {
  const navigate = useNavigate()

  // Sağdan veya soldan giriş yapmak için x değerini ayarlıyoruz
  const isEven = index % 2 === 0

  // Animasyon varyantları
  const variants = {
    hidden: { opacity: 0, x: isEven ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      onClick={() => navigate(`/profile/${player.id}`)}
      className={`flex w-full bg-primary text-white shadow-pixel cursor-pointer 
        ${player.active ? 'bg-primary hover:bg-primary-dark' : 'bg-neutral-dark opacity-50 border-2 border-dashed border-gray-500 grayscale'}
      `}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <div className={`w-3/5 p-6 pr-0 space-y-8 ${!player.active ? 'opacity-50 grayscale' : ''}`}>
        <div className="space-y-2 ">
          <p>{player.name}</p>
          <p className="text-[10px] text-purple-300 ">{player.position}</p>
        </div>

        <div className="flex items-center text-2xl">
          <img
            src={starIcon}
            className="mr-1 text-white w-7 "
          />
          {player.rating !== 0 ? (
            <>
              <div>{player.rating.toString().split('.')[0]}</div>
              <div className="text-base pt-1 tracking-[-0.3em]">.{player.rating.toFixed(2).split('.')[1][0]}</div>
            </>
          ) : (
            '-'
          )}
        </div>
      </div>
      <div className="relative flex justify-end w-2/5">
        <img
          src={unknownPicture}
          className="self-end w-40 pr-4 "
        />
      </div>
    </motion.div>
  )
}
