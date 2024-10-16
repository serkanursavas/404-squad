import AllUsersList from '../../components/admin/AllUsersList'
import useUser from '../../hooks/useUsers'

export default function AllUsers() {
  const { users } = useUser()

  return (
    <div className="w-full">
      <AllUsersList usersData={users || []} />
    </div>
  )
}
