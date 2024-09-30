import React from "react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10 ">
      <h2 className="text-2xl text-primary">ADMIN</h2>
      <div className="flex flex-col items-center justify-center w-6/12 mx-auto space-y-10">
        <Link className="w-1/2" to={"/admin/users"}>
          <Button label="Manage Users" color="" />
        </Link>
        <Link className="w-1/2" to={""}>
          <Button label="Manage Matches" color="" />
        </Link>
        <Link className="w-1/2" to={""}>
          <Button label="Manage Players" color="" />
        </Link>
      </div>
    </div>
  );
}
