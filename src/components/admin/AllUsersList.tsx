import { UserInfo } from "../../types/UserTypes";
import UserCard from "./UserCard";

type UsersListProps = {
  usersData: UserInfo[];
};

export default function AllUsersList({ usersData }: UsersListProps) {
  return (
    <div className=" text-center md:w-10/12 mx-auto mt-3">
      <h1 className="text-2xl text-neutral-dark ">Manage Users</h1>
      <table className="table-auto w-full border-separate mt-4">
        <thead className="text-primary text-base">
          <tr>
            <th scope="col" className="border px-4 py-2">
              Id
            </th>
            <th scope="col" className="border px-4 py-2">
              Name
            </th>
            <th scope="col" className="border px-4 py-2">
              Role
            </th>
            <th scope="col" className="border px-4 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-neutral-dark">
          {usersData.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
