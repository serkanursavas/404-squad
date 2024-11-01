import { User } from '../../services/userService'
import UserCard from './UserCard'

type UsersListProps = {
  usersData: User[]
}

export default function AllUsersList({ usersData }: UsersListProps) {
  return (
    <div className="mx-auto mt-3 overflow-hidden text-center md:w-10/12">
      <h1 className="text-2xl text-neutral-dark ">Manage Users</h1>
      <table className="w-full mt-4 border-separate table-auto">
        <thead className="text-sm text-primary">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 border"
            >
              Username
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2 border xs:table-cell"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-4 py-2 border"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-neutral-dark">
          {usersData.map(user => {
            return (
              <UserCard
                key={user.id}
                user={user}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
