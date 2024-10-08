import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface CardWrapperProps {
  children: ReactNode;
  route?: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ route, children }) => {
  const navigate = useNavigate();

  function handleRoute() {
    route && navigate(route);
  }

  return (
    <div
      onClick={handleRoute}
      className="p-4 space-y-4 text-sm bg-white border-2 border-black cursor-pointer shadow-pixel"
    >
      {children}
    </div>
  );
};

export default CardWrapper;
