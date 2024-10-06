import { PlayerInfo } from "../../types/PlayerTypes";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

type PlayersListProps = {
  player: PlayerInfo;
};

export default function PlayerCard({ player }: PlayersListProps) {
  return (
    <tr className="text-sm even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td scope="col" className="px-4 py-2 border">
        {player.id}
      </td>
      <td scope="col" className="px-4 py-2 border">
        {player.name}
      </td>
      <td scope="col" className="px-4 py-2 border">
        {player.age}
      </td>
      <td scope="col" className="px-4 py-2 border">
        {player.position}
      </td>
      <td scope="col" className="flex justify-center gap-10 px-4 py-2 border">
        <Link to={`/admin/update-player/${player.id}`}>
          <Button label="Update" className="text-xs text-white bg-primary" />
        </Link>
        <Button label="Delete" className="text-xs text-white bg-primary" />
      </td>
    </tr>
  );
}
