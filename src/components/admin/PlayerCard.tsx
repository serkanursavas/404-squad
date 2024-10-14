import { PlayerInfo } from '../../types/PlayerTypes'
import { showConfirmationModal } from '../../utils/showConfirmationModal'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

type PlayersListProps = {
  player: PlayerInfo
}

const handleDelete = () => {
  showConfirmationModal(
    {
      title: 'Are you sure?',
      text: 'Do you want to delete user?',
      icon: 'error',
      confirmButtonText: 'Delete',
      cancelButtonColor: '#04764E',
      confirmButtonColor: '#D32F2F'
    },
    () => {
      console.log('reset on database')
    },
    {
      title: 'Password reset!',
      text: 'Users password have been successfully resetting to username.',
      icon: 'success'
    }
  )
}

export default function PlayerCard({ player }: PlayersListProps) {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/admin/update-player/${player.id}`)
  }
  return (
    <tr className="text-sm even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {player.surname}
      </td>

      <td
        scope="col"
        className="flex flex-wrap justify-center px-4 py-2 space-y-4 border"
      >
        <Button
          onClick={handleNavigate}
          label="Update"
          className="text-xs text-white bg-primary"
        />
        <Button
          type="button"
          label="Delete"
          className="text-xs text-white bg-primary-error"
          onClick={handleDelete}
        />
      </td>
    </tr>
  )
}
