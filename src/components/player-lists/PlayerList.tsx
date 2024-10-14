import PlayerListItem from './PlayerListItem'

import userIcon from '../../assets/icons/user.svg'

interface PlayerInfo {
  playerId: number
  playerName: string
  statistic: string
}

type PlayerListProp = {
  players: PlayerInfo[]
}

export default function PlayerList({ players }: PlayerListProp) {
  return (
    <>
      {players.map(player => {
        return (
          <PlayerListItem
            key={player.playerName}
            playerId={player.playerId}
            icon={userIcon}
            playerName={player.playerName}
            statistic={player.statistic}
          />
        )
      })}
    </>
  )
}
