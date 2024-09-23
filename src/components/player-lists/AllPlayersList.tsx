import { PlayerInfo } from "../../types/PlayersTypes";
import PlayerCard from "./PlayerCard";

type PlayersListProps = {
  playersData: PlayerInfo[];
};

export default function AllPlayersList({ playersData }: PlayersListProps) {
  return (
    <div className="flex flex-wrap space-y-5 ">
      {playersData.map((player) => {
        return <PlayerCard key={player.id} player={player} />;
      })}
    </div>
  );
}
