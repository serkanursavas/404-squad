import AllPlayersList from "../../components/admin/AllPlayersList";
import { dummyPlayerInfo } from "../../dummyData/PlayerData";

export default function AllPlayers() {
  return (
    <div className="w-full">
      <AllPlayersList playersData={dummyPlayerInfo} />
    </div>
  );
}
