import AllPlayersList from '../components/player-lists/AllPlayersList'
import TypingEffect from '../components/ui/TypingEffect'
import usePlayer from '../hooks/usePlayers'

export default function AllPlayers() {
  const { players } = usePlayer()

  const activePlayers = players?.filter(player => player.active)

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
