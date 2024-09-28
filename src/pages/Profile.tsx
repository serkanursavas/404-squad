import playerPicture from "../assets/images/player.svg";
import playerFoot from "../assets/icons/foot.svg";
import playerRaiting from "../assets/icons/starAlt.svg";
import playerPosition from "../assets/icons/position.svg";
import playerNumber from "../assets/icons/number.svg";
import Icons from "../components/ui/Icons";

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
        <div className="absolute w-screen h-full -mt-20 bg-gradient-to-t from-primary to-neutral opacity-85 "></div>
        <img src={playerPicture} className="z-10 w-48" alt="player Photo" />
        <div className="z-10 w-full py-2 text-center bg-white text-primary shadow-custom-dark">
          {player.name} {player.surname}
        </div>
      </div>

      <div className="grid items-center w-full grid-cols-2 mx-2 h-80 justify-items-center">
        <div className="relative flex flex-col items-center bg-white shadow-custom-dark w-36 h-36 justify-evenly">
          {player.id}
          <Icons src={playerNumber} className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center bg-white w-36 h-36 shadow-custom-dark justify-evenly">
          {player.rating}
          <Icons src={playerRaiting} className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center bg-white w-36 h-36 shadow-custom-dark justify-evenly">
          {player.position}
          <Icons src={playerPosition} className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center bg-white w-36 h-36 shadow-custom-dark justify-evenly">
          {player.foot}
          <Icons src={playerFoot} className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
