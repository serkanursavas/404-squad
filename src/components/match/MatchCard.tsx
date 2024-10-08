import { useNavigate } from "react-router-dom";
import { MatchInfo } from "../../types/MatchTypes";
import CardWrapper from "./CardWrapper";

type MatchInfoProps = {
  match: MatchInfo;
  route?: string;
};

export default function MatchCard({ match, route }: MatchInfoProps) {
  return (
    <CardWrapper route={route}>
      <div className="text-right text-[10px] text-neutral-dark">{match.date}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>{match.team1.name}</span>
          <img
            src={match.team1.logo}
            className="w-12"
          />
        </div>
        <div className="text-base">
          <span>{match.score1}</span>-<span>{match.score2}</span>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={match.team2.logo}
            className="w-12"
          />
          <span>{match.team2.name}</span>
        </div>
      </div>
    </CardWrapper>
  );
}
