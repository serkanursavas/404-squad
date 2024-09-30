import AllUsersList from "../../components/admin/AllUsersList";

const dummyUserInfo = [
  {
    id: 1,
    userName: "Serkan",
    role: "admin",
  },
  {
    id: 2,
    userName: "Metehan",
    role: "user",
  },
  {
    id: 3,
    userName: "Caner",
    role: "user",
  },
];

export default function AllUsers() {
  return (
    <div className="space-y-6">
      <AllUsersList usersData={dummyUserInfo} />
    </div>
  );
}
