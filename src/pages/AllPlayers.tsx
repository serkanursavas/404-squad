import AllPlayersList from "../components/player-lists/AllPlayersList";
import TypingEffect from "../components/ui/TypingEffect";
import { dummyPlayerInfo } from "../dummyData/PlayerData";

export default function AllPlayers() {
  return (
    <div className="space-y-6">
      <TypingEffect
        text={["All Players"]}
        className="text-sm text-purple-400 "
      />
      <AllPlayersList playersData={dummyPlayerInfo} />
    </div>
  );
}
