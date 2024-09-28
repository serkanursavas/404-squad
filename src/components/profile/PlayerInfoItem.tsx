import Icons from "../ui/Icons";

interface PlayerInfoItemProps {
  text: string;
  icon: string;
}

export default function PlayerInfoItem({ text, icon }: PlayerInfoItemProps) {
  return (
    <div className="flex flex-col items-center w-full h-full bg-white shadow-custom-dark justify-evenly">
      {text}
      <Icons src={icon} className="w-8 h-8" />
    </div>
  );
}
