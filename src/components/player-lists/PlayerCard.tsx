import unknownPicture from '../../assets/images/unknown-player.png'
import starIcon from '../../assets/icons/starAlt.svg'
import { PlayerInfo } from '../../types/PlayerTypes'
import { useNavigate } from 'react-router-dom'

type PlayersListProps = {
  player: PlayerInfo
}

export default function PlayerCard({ player }: PlayersListProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/profile/${player.id}`)}
      className={`flex w-full bg-primary text-white shadow-pixel 
       ${player.active ? 'bg-primary hover:bg-primary-dark' : 'bg-neutral-dark opacity-50 border-2 border-dashed border-gray-500 grayscale'}
      `}
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
              <div className="text-base pt-1 tracking-[-0.3em]">.{Math.round(Number(player.rating.toFixed(2).split('.')[1]) / 10)}</div>
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
      <br />
    </div>
  )
}
