import React, { CSSProperties } from "react";

interface ButtonComponentProps {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  type = "button",
  className = "",
  disabled = false,
  style,
}) => {
  return (
    <button
      type={type}
      style={style}
      className={`btn ${className}`}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default ButtonComponent;
