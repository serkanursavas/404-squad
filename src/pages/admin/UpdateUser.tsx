import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyUserInfo } from "../../dummyData/UserData";
import { UserInfo } from "../../types/UserTypes";

export default function UpdateUser() {
  const { id } = useParams();

  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (id) {
      const userId = parseInt(id);
      const userToUpdate = dummyUserInfo.find((user) => user.id === userId);

      if (userToUpdate) {
        setUser(userToUpdate);
      }
    }
  }, [id]);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:w-6/12 mx-auto bg-white">
      <div className="p-8">
        <form className="">
          <h1 className="text-2xl text-primary text-center">Update User</h1>
          <div className="flex pt-4 flex-col space-y-10">
            <div className="flex flex-col space-y-6 mt-4">
              <label htmlFor="username">Username:</label>
              <input
                className="text-sm text-neutral-dark "
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-5">
              <label htmlFor="role">Role:</label>
              <select
                className="text-sm text-neutral-dark "
                name="role"
                id="role"
                value={user.role}
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value as "admin" | "user" })
                }
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex gap-4">
              <Button label="Update" />
              <Button label="Delete" />
              <Button label="Reset Password" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
