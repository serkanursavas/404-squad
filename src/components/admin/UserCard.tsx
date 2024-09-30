import { UserInfo } from "../../types/UserTypes";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

type UsersListProps = {
  user: UserInfo;
};

export default function UserCard({ user }: UsersListProps) {
  return (
    <>
      <tr>
        <td scope="col">{user.id}</td>
        <td scope="col">{user.userName}</td>
        <td scope="col">{user.role}</td>
        <td scope="col">
          <Link to="/signup">
            <Button label="Update" />
          </Link>
          <Button label="Delete" />
        </td>
      </tr>
    </>
  );
}
