"use client";

import { useAuth } from "./useAuth";
import type { UserRole } from "@prisma/client";

export function useCurrentRole(): UserRole | null {
  const { user } = useAuth();
  return (user?.role as UserRole) || null;
}
