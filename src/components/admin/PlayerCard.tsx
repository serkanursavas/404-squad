import { PlayerInfo } from "../../types/PlayerTypes";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

type PlayersListProps = {
  player: PlayerInfo;
};

export default function PlayerCard({ player }: PlayersListProps) {
  return (
    <tr className="text-sm  even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td scope="col" className="border px-4 py-2">
        {player.id}
      </td>
      <td scope="col" className="border px-4 py-2">
        {player.name}
      </td>
      <td scope="col" className="border px-4 py-2">
        {player.age}
      </td>
      <td scope="col" className="border px-4 py-2">
        {player.position}
      </td>
      <td scope="col" className="border px-4 py-2 flex justify-center gap-10">
        <Link to={`/admin/update-player/${player.id}`}>
          <Button label="Update" color="bg-primary text-white text-xs" />
        </Link>
        <Button label="Delete" color="bg-primary text-white text-xs" />
      </td>
    </tr>
  );
}
