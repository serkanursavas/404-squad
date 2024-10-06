import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function ManageMatches() {
  return (
    <div className="flex items-center justify-center mt-40">
      <Link to={"/admin/matches/create"}>
        <Button label="Create a Match" />
      </Link>
    </div>
  );
}
