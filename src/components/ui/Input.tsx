import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  name,
  type,
  value,
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="relative">
      <label className="text-xs text-neutral-dark" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full py-2 border-b-2 border-black focus:border-primary focus:border-b-[3px] focus:outline-none"
        name={name}
        type={showPassword && name === "password" ? "text" : type}
        value={value}
        onChange={onChange}
      />
      {name === "password" && (
        <div
          className="absolute cursor-pointer top-9 right-3"
          onClick={handleShowPassword}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
}
