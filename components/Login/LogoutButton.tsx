"use client";

import { useLogoutMutation } from "@/hooks/auth/useLogoutMutation";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const { mutate: logout, isLoading } = useLogoutMutation();

  const onClick = async () => {
    await logout();
  };

  return (
    <span
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{ opacity: isLoading ? 0.6 : 1, pointerEvents: isLoading ? "none" : "auto" }}
    >
      {children}
    </span>
  );
};
