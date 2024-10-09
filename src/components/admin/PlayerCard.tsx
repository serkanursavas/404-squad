import { PlayerInfo } from "../../types/PlayerTypes";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

type PlayersListProps = {
  player: PlayerInfo;
};

const handleDelete = () => {
  const confirmed = window.confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    console.log(`User has been deleted.`);
  }
};

export default function PlayerCard({ player }: PlayersListProps) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/admin/update-player/${player.id}`);
  };
  return (
    <tr className="text-sm even:bg-neutral odd:bg-neutral-dark odd:text-white">
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {player.id}
      </td>
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {player.name}
      </td>
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {player.age}
      </td>
      <td
        scope="col"
        className="px-4 py-2 border"
      >
        {player.position}
      </td>
      <td
        scope="col"
        className="flex justify-center gap-10 px-4 py-2 border"
      >
        <Button
          onClick={handleNavigate}
          label="Update"
          className="text-xs text-white bg-primary"
        />
        <Button
          type="button"
          label="Delete"
          className="text-xs text-white bg-primary"
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
}
