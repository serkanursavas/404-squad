import AllPlayersList from "../components/player-lists/AllPlayersList";
import TypingEffect from "../components/ui/TypingEffect";

const dummyPlayerInfo = [
  {
    id: 1,
    name: "Serkan",
    age: 28,
    form: 7.7,
    position: "Forvet",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Metehan",
    age: 24,
    form: 6.6,
    position: "Orta Saha",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Caner",
    age: 31,
    form: 4.5,
    position: "Defans",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Isa Can",
    age: 26,
    form: 9,
    position: "Kaleci",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Hayri Sencer",
    age: 29,
    form: 8.5,
    position: "Orta Saha",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Muhammet Furkan",
    age: 23,
    form: 6.2,
    position: "Forvet",
    photo: "https://via.placeholder.com/150",
  },
];

export default function AllPlayers() {
  return (
    <div className="space-y-6">
      <TypingEffect
        text={["All Players"]}
        className="text-sm text-purple-400 "
      />
      <AllPlayersList playersData={dummyPlayerInfo} />
    </div>
  );
}
