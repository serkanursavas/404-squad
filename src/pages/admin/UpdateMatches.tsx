import React from "react";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function CreateMatches() {
  return (
    <div>
      <div>
        <Input label="Match Place" name="Match Place" type="string" />
      </div>
      <div>
        <Input label="Match Date" name="Match Place" type="string" />
      </div>
      <div>Roster1</div>
      <div>Roster2</div>
      <Link to={"/admin/matches/:id"}>
        <Button label="Create" />
      </Link>
    </div>
  );
}
