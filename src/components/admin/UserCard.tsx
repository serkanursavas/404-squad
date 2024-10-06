import { UserInfo } from "../../types/UserTypes";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

type UsersListProps = {
  user: UserInfo;
};

export default function UserCard({ user }: UsersListProps) {
  return (
    <tr className="text-sm even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td scope="col" className="px-4 py-2 border">
        {user.id}
      </td>
      <td scope="col" className="px-4 py-2 border">
        {user.username}
      </td>
      <td scope="col" className="px-4 py-2 border">
        {user.role}
      </td>
      <td scope="col" className="flex justify-center gap-10 px-4 py-2 border">
        <Link to={`/admin/update-user/${user.id}`}>
          <Button label="Update" className="text-xs text-white bg-primary" />
        </Link>
        <Button label="Delete" className="text-xs text-white bg-primary" />
      </td>
    </tr>
  );
}
