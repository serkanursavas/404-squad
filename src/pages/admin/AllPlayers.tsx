import AllPlayersList from '../../components/admin/AllPlayersList'
import PixelSpinner from '../../components/ui/PixelSpinner'
import usePlayer from '../../hooks/usePlayers'

export default function AllPlayers() {
  const { players } = usePlayer()

  if (!players) {
    return (
      <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-screen h-screen ">
        <PixelSpinner />
      </div>
    )
  }

  return (
    <div className="w-full">
      <AllPlayersList playersData={players || []} />
    </div>
  )
}
