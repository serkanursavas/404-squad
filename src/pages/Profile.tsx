import playerPicture from "../assets/images/player.svg";
import playerFoot from "../assets/icons/foot.svg";
import playerRaiting from "../assets/icons/starAlt.svg";
import playerPosition from "../assets/icons/position.svg";
import playerNumber from "../assets/icons/number.svg";
import PlayerInfoItem from "../components/profile/PlayerInfoItem";

const player = {
  id: 10,
  name: "Lionel",
  surname: "Messi",
  foot: "Left",
  position: "Forward",
  rating: 9.8,
};

export default function Profile() {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-8 ">
      <div className="relative flex flex-col items-center w-full px-12 pt-16">
        <div className="absolute w-screen h-full -mt-20 bg-gradient-to-t from-primary to-neutral opacity-80 "></div>
        <img src={playerPicture} className="z-10 w-48" alt="player Photo" />
        <div className="z-10 w-full py-2 text-center bg-white text-primary shadow-custom-dark">
          {player.name} {player.surname}
        </div>
      </div>

      <div className="grid items-center w-full grid-cols-2 gap-6 p-4 mx-2 h-80 justify-items-center ">
        <PlayerInfoItem text={String(player.id)} icon={playerNumber} />
        <PlayerInfoItem text={String(player.rating)} icon={playerRaiting} />
        <PlayerInfoItem text={player.position} icon={playerPosition} />
        <PlayerInfoItem text={player.foot} icon={playerFoot} />
      </div>
    </div>
  );
}
