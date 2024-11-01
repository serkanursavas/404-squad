import AllUsersList from '../../components/admin/AllUsersList'
import PixelSpinner from '../../components/ui/PixelSpinner'
import useUser from '../../hooks/useUsers'

export default function AllUsers() {
  const { users } = useUser()

  if (!users) {
    return (
      <div className="absolute top-0 left-0 z-0 flex items-center justify-center w-screen h-screen ">
        <PixelSpinner />
      </div>
    )
  }

  return (
    <div className="w-full">
      <AllUsersList usersData={users || []} />
    </div>
  )
}
