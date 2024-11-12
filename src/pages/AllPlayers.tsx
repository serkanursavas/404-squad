import { useEffect } from 'react'
import AllPlayersList from '../components/player-lists/AllPlayersList'
import PixelSpinner from '../components/ui/PixelSpinner'
import TypingEffect from '../components/ui/TypingEffect'
import usePlayer from '../hooks/usePlayers'

export default function AllPlayers() {
  const { players } = usePlayer()

  const activePlayers = players ? players.filter(player => player.active) : []
  activePlayers.sort((a, b) => b.rating - a.rating)

  if (!activePlayers) {
    return (
      <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-screen h-screen ">
        <PixelSpinner />
      </div>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="space-y-6">
      <TypingEffect
        text={['All Players']}
        className="text-sm text-purple-400 "
      />
      <AllPlayersList playersData={activePlayers || []} />
    </div>
  )
}
