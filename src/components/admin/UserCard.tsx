import { UserInfo } from "../../types/UserTypes";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

type UsersListProps = {
  user: UserInfo;
};

export default function UserCard({ user }: UsersListProps) {
  return (
    <tr className="text-sm even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td scope="col" className="border px-4 py-2">
        {user.id}
      </td>
      <td scope="col" className="border px-4 py-2">
        {user.username}
      </td>
      <td scope="col" className="border px-4 py-2">
        {user.role}
      </td>
      <td scope="col" className="border px-4 py-2 flex justify-center gap-10">
        <Link to={`/admin/update-user/${user.id}`}>
          <Button label="Update" color="bg-primary text-white text-xs" />
        </Link>
        <Button label="Delete" color="bg-primary text-white text-xs" />
      </td>
    </tr>
  );
}
