import { Roster } from '../../../types/MatchTypes'
import { useState } from 'react'
import SquadListDisplay from './SquadListDisplay'
import VoteForm from './VoteForm'

interface SquadListProps {
  teamLogo: string
  squad: Roster[]
  played: boolean // Maçın oynanıp oynanmadığı
  isVotingClosed: boolean // Maçın oylamaya kalıcı olarak kapalı olup olmadığı
}

export default function SquadList({ teamLogo, squad, played, isVotingClosed }: SquadListProps) {
  const currentUserId = 3
  const [hasVoted, setHasVoted] = useState(false) // backend api hazirlanacak rating sorgusu ile contexapi
  const inTeam: boolean = squad.some(player => player.id === currentUserId)

  const canVote = played && inTeam && !hasVoted && !isVotingClosed

  return (
    <div>
      <div className="flex justify-between mb-3 text-neutral-dark border-b border-black text-[10px]">
        <span>Player</span>
        {isVotingClosed && <span>Rating</span>}
      </div>

      <div className="relative">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-20"
          style={{
            backgroundImage: `url(${teamLogo})`
          }}
        ></div>

        {canVote ? (
          <VoteForm
            squad={squad}
            handlePlayerVoted={() => setHasVoted(true)}
          />
        ) : (
          <SquadListDisplay
            squad={squad}
            isVoted={isVotingClosed}
          />
        )}
      </div>
    </div>
  )
}
