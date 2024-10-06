import React, { ReactNode } from "react";
import Select, { SingleValue } from "react-select";

interface PlayerOption {
  value: string;
  label: string;
}

interface TeamSelectionProps {
  teamName: string;
  team: string[];
  setTeam: React.Dispatch<React.SetStateAction<string[]>>;
  remainingPlayers: string[];
  selectedPlayer: PlayerOption | null;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<PlayerOption | null>>;
  teamSize: number;
  icon?: ReactNode;
}

const TeamSelection: React.FC<TeamSelectionProps> = ({
  teamName,
  team,
  setTeam,
  remainingPlayers,
  selectedPlayer,
  setSelectedPlayer,
  teamSize,
  icon,
}) => {
  const playerOptions: PlayerOption[] = remainingPlayers.map((player) => ({
    value: player,
    label: player,
  }));

  const handleRemovePlayer = (player: string) => {
    setTeam(team.filter((p) => p !== player));
  };

  const handleSelectChange = (selectedOption: SingleValue<PlayerOption>) => {
    if (
      selectedOption &&
      !team.includes(selectedOption.value) &&
      team.length < teamSize
    ) {
      setTeam([...team, selectedOption.value]);
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label className="text-primary">{teamName}</label>
      <Select
        value={selectedPlayer}
        options={playerOptions}
        onChange={handleSelectChange}
        className="w-full text-sm border rounded"
      />

      <div>
        {team.length > 0 && (
          <div className="text-xs text-black bg-white">
            <ul className="space-y-1">
              {team.map((player, index) => (
                <li key={index} className="flex items-center justify-between">
                  {player}{" "}
                  <button
                    onClick={() => handleRemovePlayer(player)}
                    className="ml-2 text-red-500"
                  >
                    {icon}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSelection;
