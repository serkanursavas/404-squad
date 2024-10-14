import playerPicture from '../assets/images/player.svg'
import playerFoot from '../assets/icons/foot.svg'
import playerRaiting from '../assets/icons/starAlt.svg'
import playerPosition from '../assets/icons/position.svg'
import playerNumber from '../assets/icons/number.svg'
import PlayerInfoItem from '../components/profile/PlayerInfoItem'
import { PlayerInfo } from '../types/PlayerTypes'
import { useParams } from 'react-router-dom'

const players: PlayerInfo[] = [
  {
    id: 1,
    name: 'Lionel',
    surname: 'Messi',
    foot: 'Left',
    position: 'Forward',
    rating: 9.8,
    active: true,
    photo: 'https://example.com/photo-messi.jpg'
  },
  {
    id: 2,
    name: 'Cristiano',
    surname: 'Ronaldo',
    foot: 'Right',
    position: 'Forward',
    rating: 9.7,
    active: true,
    photo: 'https://example.com/photo-ronaldo.jpg'
  },
  {
    id: 3,
    name: 'Manuel',
    surname: 'Neuer',
    foot: 'Right',
    position: 'Goalkeeper',
    rating: 9.2,
    active: true,
    photo: 'https://example.com/photo-neuer.jpg'
  },
  {
    id: 4,
    name: 'Sergio',
    surname: 'Ramos',
    foot: 'Right',
    position: 'Defender',
    rating: 9.3,
    active: true,
    photo: 'https://example.com/photo-ramos.jpg'
  },
  {
    id: 5,
    name: 'Andrés',
    surname: 'Iniesta',
    foot: 'Right',
    position: 'Midfielder',
    rating: 9.5,
    active: false,
    photo: 'https://example.com/photo-iniesta.jpg'
  },
  {
    id: 6,
    name: 'Neymar',
    surname: 'Jr.',
    foot: 'Right',
    position: 'Forward',
    rating: 9.4,
    active: true,
    photo: 'https://example.com/photo-neymar.jpg'
  },
  {
    id: 7,
    name: 'Gerard',
    surname: 'Piqué',
    foot: 'Right',
    position: 'Defender',
    rating: 8.9,
    active: false,
    photo: 'https://example.com/photo-pique.jpg'
  },
  {
    id: 8,
    name: 'Thiago',
    surname: 'Silva',
    foot: 'Right',
    position: 'Defender',
    rating: 9.1,
    active: true,
    photo: 'https://example.com/photo-thiago.jpg'
  },
  {
    id: 9,
    name: 'Kylian',
    surname: 'Mbappé',
    foot: 'Right',
    position: 'Forward',
    rating: 9.6,
    active: true,
    photo: 'https://example.com/photo-mbappe.jpg'
  },
  {
    id: 10,
    name: 'Luka',
    surname: 'Modrić',
    foot: 'Right',
    position: 'Midfielder',
    rating: 9.4,
    active: true,
    photo: 'https://example.com/photo-modric.jpg'
  }
]

export default function Profile() {
  const { id } = useParams()

  const player = players.find(player => player.id === parseInt(id || '0'))

  return (
    <div className="relative flex flex-col items-center justify-center space-y-8 ">
      <div className="relative flex flex-col items-center w-full px-12 pt-16">
        <div className="absolute w-screen h-full -mt-20 bg-gradient-to-t from-primary to-neutral opacity-80 "></div>
        <img
          src={playerPicture}
          className="z-10 w-48"
          alt="player Photo"
        />
        <div className="z-10 w-full py-2 text-center bg-white text-primary shadow-custom-dark">
          {player?.name} {player?.surname}
        </div>
      </div>

      <div className="grid items-center w-full grid-cols-2 gap-6 p-4 mx-2 h-80 justify-items-center ">
        <PlayerInfoItem
          text={String(player?.id)}
          icon={playerNumber}
        />
        <PlayerInfoItem
          text={String(player?.rating)}
          icon={playerRaiting}
        />
        <PlayerInfoItem
          text={player?.position || ''}
          icon={playerPosition}
        />
        <PlayerInfoItem
          text={player?.foot || ''}
          icon={playerFoot}
        />
      </div>
    </div>
  )
}
