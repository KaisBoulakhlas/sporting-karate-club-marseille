"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const onClick = () => {
    signOut({ redirectTo: "/login" });
  };

  return (
    <span onClick={onClick} className={`cursor-pointer ${className}`}>
      {children}
    </span>
  );
};
