import { UserInfo } from "../../types/UserTypes";
import UserCard from "./UserCard";

type UsersListProps = {
  usersData: UserInfo[];
};

export default function AllUsersList({ usersData }: UsersListProps) {
  return (
    <div className="mx-auto mt-3 text-center md:w-10/12">
      <h1 className="text-2xl text-neutral-dark ">Manage Users</h1>
      <table className="w-full mt-4 border-separate table-auto">
        <thead className="text-base text-primary">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 border"
            >
              Id
            </th>
            <th
              scope="col"
              className="px-4 py-2 border"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-2 border"
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
          {usersData.map((user) => {
            return (
              <UserCard
                key={user.id}
                user={user}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
