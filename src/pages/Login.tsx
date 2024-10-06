import Button from "../components/ui/Button";
import logo from "../assets/images/logos/logo.png";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen px-8 py-4 bg-white xs:py-12">
      <div className="flex flex-col justify-around min-h-screen space-y-6">
        <div className="flex items-center justify-center">
          <img className="w-48 xs:w-56" src={logo} alt="Company Logo" />
        </div>
        <div>
          <div className="mb-10 text-3xl text-center xs:mb-16 xs:text-4xl text-primary">
            Login
          </div>
          <form className="flex flex-col space-y-8">
            <div>
              <Input label="Username" name="username" type="text" />
            </div>
            <div>
              <Input label="Password" name="password" type="password" />
            </div>

            <Button
              label="Login"
              className="mx-1 text-white bg-primary"
              shadowColor="rgba(255,255,255, 0.2)"
            />
          </form>
          <div className="mt-5 text-[9px] xs:text-[10px] space-x-2 xs:space-x-6 ">
            <span>Don't you have an account?</span>
            <Link className="text-purple-400" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
