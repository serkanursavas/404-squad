import { Player } from '../../../types/MatchTypes'
import { useState } from 'react'
import SquadListDisplay from './SquadListDisplay'
import VoteForm from './VoteForm'

interface SquadListProps {
  teamLogo: string
  squad: Player[]
  isPlayed: boolean // Maçın oynanıp oynanmadığı
  voteMode: boolean // Oy verme modunun aktif olup olmadığı
  isVotingClosed: boolean // Maçın oylamaya kalıcı olarak kapalı olup olmadığı
}

export default function SquadList({ teamLogo, squad, isPlayed, voteMode, isVotingClosed }: SquadListProps) {
  const currentUserId = 6
  const [hasVoted, setHasVoted] = useState(false) // backend api hazirlanacak rating sorgusu ile
  const inTeam: boolean = squad.some(player => player.id === currentUserId)

  const canVote = isPlayed && inTeam && !hasVoted && !isVotingClosed && voteMode

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

        {canVote ? (
          <VoteForm
            squad={squad}
            handlePlayerVoted={() => setHasVoted(true)}
          />
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
