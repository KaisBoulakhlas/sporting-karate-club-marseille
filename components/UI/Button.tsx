import { ButtonProps } from "@/types/types";
import Link from "next/link";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  size,
  type = "button",
  onClick,
  icon,
  text,
}) => {
  const sizeClass = size ? (size === "small" ? "small" : "large") : "";

  return (
    <Link
      href="#presentation"
      className={`button ${sizeClass}`}
      type={type}
      onClick={onClick}>
      {icon && <span className="button__icon">{icon}</span>}
      {text && <span className="button__text">{text}</span>}
    </Link>
  );
};

export default Button;
