import PlayerListItem from './PlayerListItem'

import userIcon from '../../assets/icons/user.svg'
import { TopScorer } from '../../services/goalService'

type PlayerListProp = {
  players: TopScorer[]
}

export default function PlayerList({ players }: PlayerListProp) {
  return (
    <>
      {players.map(player => {
        return (
          <PlayerListItem
            key={player.name}
            playerId={player.id}
            icon={userIcon}
            playerName={player.name}
            playerSurname={player.surname}
            statistic={player.goalCount}
          />
        )
      })}
    </>
  )
}
