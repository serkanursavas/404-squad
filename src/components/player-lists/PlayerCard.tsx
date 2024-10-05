import mvpPic from "../../assets/images/mvp.png";
import starIcon from "../../assets/icons/starAlt.svg";
import { PlayerInfo } from "../../types/PlayerTypes";

type PlayersListProps = {
  player: PlayerInfo;
};

export default function PlayerCard({ player }: PlayersListProps) {
  return (
    <div className="flex text-white bg-primary shadow-pixel w-full">
      <div className="p-6 pr-0 space-y-8 w-5/12  ">
        <div className="space-y-2 ">
          <p>{player.name}</p>
          <p className="text-[10px] text-purple-300 ">{player.position}</p>
        </div>

        <div className="flex text-2xl items-center">
          <img src={starIcon} className="mr-1 text-white w-7" />
          <div>{player.form.toString().split(".")[0]}</div>
          <div className="text-base pt-1 tracking-[-0.3em]">
            .{player.form.toString().split(".")[1]}
          </div>
        </div>
      </div>
      <div className="relative flex justify-end w-7/12 ">
        <img src={mvpPic} className="w-60" />
      </div>
      <br />
    </div>
  );
}
