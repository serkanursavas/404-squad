import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { showConfirmationModal } from '../../utils/showConfirmationModal'
import { User } from '../../services/userService'
import useUser from '../../hooks/useUsers'

type UsersListProps = {
  user: User
}

export default function UserCard({ user }: UsersListProps) {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/admin/update-user/${user.id}`)
  }
  const { deleteUser } = useUser()

  const handleDelete = (username: string) => {
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
        deleteUser(username)
      }
    )
  }

  return (
    <tr className="text-xs even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td
        scope="col"
        className="px-2 py-0 border"
      >
        {user.username}
      </td>
      <td
        scope="col"
        className="hidden px-2 py-2 border xs:table-cell"
      >
        {user.role}
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
          onClick={() => handleDelete(user.username)}
        />
      </td>
    </tr>
  )
}
