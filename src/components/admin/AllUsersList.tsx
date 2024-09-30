import { UserInfo } from "../../types/UserTypes";
import UserCard from "./UserCard";

type UsersListProps = {
  usersData: UserInfo[];
};

export default function AllUsersList({ usersData }: UsersListProps) {
  return (
    <div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
