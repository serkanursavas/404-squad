import PlayerListItem from './PlayerListItem'

import userIcon from '../../assets/icons/user.svg'
import { TopPlayer } from '../../services/goalService'

type PlayerListProp = {
  players: TopPlayer[]
}

export default function PlayerList({ players }: PlayerListProp) {
  return (
    <>
      {players.map(player => {
        const { rating } = player

        const formattedRating = rating !== undefined && rating !== null ? Math.round(rating * 10) / 10 : 0

        return (
          <PlayerListItem
            key={player.name}
            playerId={player.playerId}
            icon={userIcon}
            playerName={player.name}
            playerSurname={player.surname}
            statistic={player?.goalCount ?? formattedRating ?? 0}
          />
        )
      })}
    </>
  )
}
