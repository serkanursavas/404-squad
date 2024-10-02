import { Player } from '../../../types/MatchTypes'
import { useState } from 'react'
import SquadListDisplay from './SquadListDisplay'
import VoteForm from './VoteForm'

interface SquadListProps {
  teamLogo: string
  squad: Player[]
  isPlayed: boolean
  voteMode: boolean
}

export default function SquadList({ teamLogo, squad, isPlayed, voteMode }: SquadListProps) {
  const currentUserId = 6
  const [isVoted, setIsVoted] = useState(false)
  const inTeam: boolean = squad.some(player => player.id === currentUserId)

  return (
    <div>
      <div className="flex justify-between mb-3 text-neutral-dark border-b border-black text-[10px]">
        <span>Player</span>
        <span>Form</span>
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-20"
          style={{
            backgroundImage: `url(${teamLogo})`
          }}
        ></div>

        {!isPlayed && inTeam && !isVoted && voteMode ? (
          <VoteForm squad={squad} />
        ) : (
          <SquadListDisplay
            squad={squad}
            isPlayed={isPlayed}
          />
        )}
      </div>
    </div>
  )
}
