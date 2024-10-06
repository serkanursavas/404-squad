import React, { useState } from "react";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Trash from "../../assets/icons/Trash.svg";
import TeamSelection from "../../components/admin/TeamSelection";

interface PlayerOption {
  value: string;
  label: string;
}

const players: string[] = [
  "Player 1",
  "Player 2",
  "Player 3",
  "Player 4",
  "Player 5",
  "Player 6",
  "Player 7",
  "Player 8",
  "Player 9",
  "Player 10",
  "Player 11",
  "Player 12",
];

export default function CreateMatches() {
  const [whiteTeam, setWhiteTeam] = useState<string[]>([]);
  const [blackTeam, setBlackTeam] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState<number>(6);
  const [selectedWhitePlayer, setSelectedWhitePlayer] =
    useState<PlayerOption | null>(null);
  const [selectedBlackPlayer, setSelectedBlackPlayer] =
    useState<PlayerOption | null>(null);
  const [matchPlace, setMatchPlace] = useState<string>("");
  const [matchDate, setMatchDate] = useState<string>("");

  const remainingPlayers = players.filter(
    (player) => !whiteTeam.includes(player) && !blackTeam.includes(player)
  );

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value < 6) {
      alert("Team size must be at least 6!");
      setTeamSize(6);
      return;
    }
    if (value > 11) {
      alert("Team size can be at most 11!");
      setTeamSize(6);
      return;
    }

    setTeamSize(value);
  };

  const isFormValid = () => {
    return (
      matchPlace &&
      matchDate &&
      teamSize &&
      whiteTeam.length === teamSize &&
      blackTeam.length === teamSize
    );
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (!isFormValid()) {
      e.preventDefault();
      alert("Please fill all required fields before creating the match.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 space-y-5">
      <div>
        <Input
          label="Match Place"
          name="Match Place"
          type="string"
          value={matchPlace}
          onChange={(e) => setMatchPlace(e.target.value)}
        />
      </div>
      <div>
        <Input
          label="Match Date"
          name="Match Date"
          type="date"
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
        />
      </div>

      <div className="w-full space-y-2">
        <label>Team size:</label>
        <input
          type="number"
          value={teamSize || ""}
          onChange={handleTeamSizeChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* White Team Seçimi */}
      <TeamSelection
        teamName="White Team"
        team={whiteTeam}
        setTeam={setWhiteTeam}
        remainingPlayers={remainingPlayers}
        selectedPlayer={selectedWhitePlayer}
        setSelectedPlayer={setSelectedWhitePlayer}
        teamSize={teamSize}
        icon={<img src={Trash} alt="Remove icon" />}
      />

      {/* Black Team Seçimi */}
      <TeamSelection
        teamName="Black Team"
        team={blackTeam}
        setTeam={setBlackTeam}
        remainingPlayers={remainingPlayers}
        selectedPlayer={selectedBlackPlayer}
        setSelectedPlayer={setSelectedBlackPlayer}
        teamSize={teamSize}
        icon={<img src={Trash} alt="Remove icon" />}
      />

      <Link
        to={isFormValid() ? "/admin/matches" : "#"}
        onClick={handleButtonClick}
      >
        <Button label="Create" />
      </Link>
    </div>
  );
}
