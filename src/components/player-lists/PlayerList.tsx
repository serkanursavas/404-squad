import PlayerListItem from './PlayerListItem'

import userIcon from '../../assets/icons/user.svg'
import { TopPlayer } from '../../services/goalService'

type PlayerListProp = {
  players: TopPlayer[]
  seeAll?: boolean
}

export default function PlayerList({ players, seeAll }: PlayerListProp) {
  return (
    <>
      {players.slice(0, seeAll ? 5 : 10).map(player => {
        const { rating } = player

        const formattedRating = rating !== undefined && rating !== null ? Number((Math.floor(rating * 10) / 10).toFixed(1)) : 0.0
        const formattedFormScore =
          player?.formScore !== undefined && player?.formScore !== null ? Number((Math.floor(player?.formScore * 10) / 10).toFixed(1)) : 0.0

        const formattedLast5AvgRating =
          player?.last5AvgRating !== undefined && player?.last5AvgRating !== null
            ? Number((Math.floor(player?.last5AvgRating * 10) / 10).toFixed(1))
            : 0.0

        console.log(formattedFormScore)

        return (
          <PlayerListItem
            key={player.playerId}
            playerId={player.playerId}
            icon={userIcon}
            playerName={player.name}
            playerSurname={player.surname}
            statistic={player?.goalCount || formattedRating || formattedLast5AvgRating || 0}
            statisticLabel={player?.gameCount ?? ''}
            seeAll={seeAll}
          />
        )
      })}
    </>
  )
}
