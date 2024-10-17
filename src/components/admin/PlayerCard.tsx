import { Player } from '../../services/playerService'

import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

export default function PlayerCard({ player }: { player: Player }) {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/admin/update-player/${player.id}`)
  }

  return (
    <tr className="text-sm even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td
        scope="col"
        className="px-4 py-2 border "
      >
        {player.name.split(' ')[0][0]}.{player.surname.split(' ').pop()}
      </td>

      <td
        scope="col"
        className="flex flex-wrap justify-center px-6 py-2 space-y-4 border"
      >
        <Button
          onClick={handleNavigate}
          label="Update"
          className="text-xs text-white bg-primary"
        />
      </td>
    </tr>
  )
}
