import "./Button.css";

type ButtonProps = {
  label: string;
  className?: string;
  shadowColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  label,
  className = "bg-neutral-light",
  shadowColor = "grey",
  onClick,
  disabled = false,
  type,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`relative px-3 py-2 ${className} btn text-[12px] ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
