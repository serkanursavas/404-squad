import { UserInfo } from "../../types/UserTypes";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

type UsersListProps = {
  user: UserInfo;
};

const handleDelete = () => {
  const confirmed = window.confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    console.log(`User has been deleted.`);
  }
};

export default function UserCard({ user }: UsersListProps) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/admin/update-user/${user.id}`);
  };
  return (
    <tr className="text-sm even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {user.id}
      </td>
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {user.username}
      </td>
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {user.role}
      </td>
      <td
        scope="col"
        className="flex justify-center gap-10 px-4 py-2 border"
      >
        <Button
          onClick={handleNavigate}
          label="Update"
          className="text-xs text-white bg-primary"
        />
        <Button
          type="button"
          label="Delete"
          className="text-xs text-white bg-primary"
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
}
