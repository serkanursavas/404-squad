import { Roster } from '../../../types/MatchTypes'
import { useEffect, useState } from 'react'
import SquadListDisplay from './SquadListDisplay'
import VoteForm from './VoteForm'
import useAuth from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

interface SquadListProps {
  teamLogo: string
  squad: Roster[]
  played: boolean // Maçın oynanıp oynanmadığı
  isVotingClosed: boolean // Maçın oylamaya kalıcı olarak kapalı olup olmadığı
}

export default function SquadList({ teamLogo, squad, played, isVotingClosed }: SquadListProps) {
  const { user } = useAuth()

  const currentPlayerId = user?.id ?? 0
  const { hasVoted } = useSelector((state: RootState) => state.auth)

  console.log(hasVoted)

  const inTeam: boolean = squad?.some(player => player.playerId === currentPlayerId)

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
            currentPlayerId={currentPlayerId}
          />
        ) : (
          <SquadListDisplay
            squad={squad}
            isVoted={isVotingClosed}
            currentPlayerId={currentPlayerId}
          />
        )}
      </div>
    </div>
  )
}
