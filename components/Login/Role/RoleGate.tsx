"use client";
import React from "react";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/auth/useCurrentRole";

interface RoleGateProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const RoleGate: React.FC<RoleGateProps> = ({ allowedRoles, children }) => {
  const userRole = useCurrentRole();

  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  return userRole && allowedRoles.includes(userRole) ? <>{children}</> : null;
};

export default RoleGate;
