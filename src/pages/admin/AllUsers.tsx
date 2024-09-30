import AllUsersList from "../../components/admin/AllUsersList";
import { dummyUserInfo } from "../../dummyData/UserData";

export default function AllUsers() {
  return (
    <div className="w-full">
      <AllUsersList usersData={dummyUserInfo} />
    </div>
  );
}
