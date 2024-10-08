import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

import blackLogo from "../../assets/images/club-black.svg";
import whiteLogo from "../../assets/images/club-white.svg";
import MatchCard from "../../components/match/MatchCard";
import { MatchInfo } from "../../types/MatchTypes";
import { useState } from "react";

const dummyMatchInfo: MatchInfo = {
  id: 1,
  date: "Monday, 24 September",
  team1: {
    name: "Black",
    logo: blackLogo,
  },
  score1: 4,
  team2: {
    name: "White",
    logo: whiteLogo,
  },
  score2: 6,
};

export default function ManageMatches() {
  const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(dummyMatchInfo);

  return (
    <div>
      {matchInfo ? (
        <MatchCard
          match={matchInfo}
          route={`/admin/matches/${matchInfo.id}`}
        />
      ) : (
        <div className="flex items-center justify-center mt-40">
          <Link to={"/admin/matches/create"}>
            <Button label="Create a Match" />
          </Link>
        </div>
      )}
    </div>
  );
}
