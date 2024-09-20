import PlayerListItem from './PlayerListItem'

interface PlayerInfo {
  icon: string
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
            icon={player.icon}
            playerName={player.playerName}
            statistic={player.statistic}
          />
        )
      })}
    </>
  )
}
