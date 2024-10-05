import { PlayerInfo } from "../../types/PlayerTypes";
import PlayerCard from "./PlayerCard";

type PlayersListProps = {
  playersData: PlayerInfo[];
};

export default function AllPlayersList({ playersData }: PlayersListProps) {
  return (
    <div className=" text-center md:w-10/12 mx-auto mt-3">
      <h1 className="text-2xl text-neutral-dark ">Manage Players</h1>
      <table className="table-auto w-full border-separate mt-4">
        <thead className="text-primary text-base">
          <tr>
            <th scope="col" className="border px-4 py-2">
              Id
            </th>
            <th scope="col" className="border px-4 py-2">
              Name
            </th>
            <th scope="col" className="border px-4 py-2">
              Age
            </th>
            <th scope="col" className="border px-4 py-2">
              Position
            </th>
            <th scope="col" className="border px-4 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-neutral-dark ">
          {playersData.map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
