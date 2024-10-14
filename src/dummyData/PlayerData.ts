import { PlayerInfo } from '../types/PlayerTypes'

export const dummyPlayerInfo: PlayerInfo[] = [
  {
    id: 1,
    name: 'Serkan',
    surname: 'Ursavas',
    foot: 'right',
    photo: 'https://via.placeholder.com/150',
    position: 'Forward',
    active: true,
    rating: Math.floor(Math.random() * 10) + 1
  },
  {
    id: 2,
    name: 'Metehan',
    surname: 'Canpolat',
    foot: 'right',
    photo: 'https://via.placeholder.com/150',
    position: 'Midfielder',
    active: false,
    rating: Math.floor(Math.random() * 10) + 1
  },
  {
    id: 3,
    name: 'Caner',
    surname: 'Tanriverdi',
    foot: 'right',
    photo: 'https://via.placeholder.com/150',
    position: 'Defender',
    active: true,
    rating: Math.floor(Math.random() * 10) + 1
  },
  {
    id: 4,
    name: 'Isa Can',
    surname: 'Cabuk',
    foot: 'left',
    photo: 'https://via.placeholder.com/150',
    position: 'Goalkeeper',
    active: true,
    rating: Math.floor(Math.random() * 10) + 1
  },
  {
    id: 5,
    name: 'Hayri Sencer',
    surname: 'Ceran',
    foot: 'right',
    photo: 'https://via.placeholder.com/150',
    position: 'Midfielder',
    active: true,
    rating: Math.floor(Math.random() * 10) + 1
  },
  {
    id: 6,
    name: 'Muhammet Furkan',
    surname: 'Doe',
    foot: 'left',
    photo: 'https://via.placeholder.com/150',
    position: 'Forward',
    active: false,
    rating: Math.floor(Math.random() * 10) + 1
  }
]
