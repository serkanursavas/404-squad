import React from "react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10">
      <h2 className="text-2xl text-primary">ADMIN</h2>
      <div className="flex flex-col items-center justify-center w-6/12 mx-auto space-y-10">
        <Link className="" to={"/admin/users"}>
          <Button label="Manage Users" className="" />
        </Link>
        <Link className="" to={"/admin/matches"}>
          <Button label="Manage Matches" className="" />
        </Link>
        <Link className="" to={""}>
          <Button label="Manage Players" className="" />
        </Link>
      </div>
    </div>
  );
}
