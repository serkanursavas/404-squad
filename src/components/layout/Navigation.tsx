import { NavLink } from "react-router-dom";

import homeIcon from "../../assets/icons/home.svg";
import matchesIcon from "../../assets/icons/matches.svg";
import profileIcon from "../../assets/icons/profile.svg";
import playersIcon from "../../assets/icons/players.svg";
import adminIcon from "../../assets/icons/android.svg";

import Icons from "../ui/Icons";

interface Props {
  toggleMobileMenu: () => void;
}

const navLinks = [
  { to: "/", label: "Home", icon: homeIcon },
  { to: "/matches", label: "Matches", icon: matchesIcon },
  { to: "/profile/1", label: "Profile", icon: profileIcon },
  { to: "/players", label: "Players", icon: playersIcon },
  { to: "/admin", label: "Admin", icon: adminIcon },
];

export default function Navigation({ toggleMobileMenu }: Props) {
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-full text-3xl bg-primary">
      <ul className="space-y-10">
        {navLinks.map((navLink) => {
          return (
            <li key={navLink.to}>
              <NavLink
                to={navLink.to}
                onClick={toggleMobileMenu}
                className="flex items-center space-x-2 "
                style={({ isActive }) => ({
                  color: isActive ? "white" : undefined,
                })}
              >
                <Icons src={navLink.icon} className="h-full w-9" />
                <span>{navLink.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
