import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Signup() {
  return (
    <div className="flex items-center justify-center h-screen px-8 py-4 bg-white xs:py-12">
      <div className="flex flex-col justify-around min-h-screen space-y-6">
        <div>
          <div className="mb-10 text-3xl text-center text-primary xs:mb-16 xs:text-4xl">
            Create an account
          </div>
          <form className="flex flex-col space-y-8">
            <div>
              <Input label="Username" name="username" type="text" />
            </div>
            <div>
              <Input label="Password" name="password" type="password" />
            </div>
            <div>
              <Input label="Password" name="password" type="password" />
            </div>

            <Button
              label="Create"
              color="mx-1 bg-secondary text-black"
              shadowColor="rgba(255,255,255, 0.2)"
            />
          </form>
          <div className="mt-5 text-[9px] xs:text-[10px] space-x-2 xs:space-x-6 ">
            <span>Already have an account?</span>
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
