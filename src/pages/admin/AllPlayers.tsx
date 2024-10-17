import AllPlayersList from '../../components/admin/AllPlayersList'
import usePlayer from '../../hooks/usePlayers'

export default function AllPlayers() {
  const { players } = usePlayer()

  return (
    <div className="w-full">
      <AllPlayersList playersData={players || []} />
    </div>
  )
}
