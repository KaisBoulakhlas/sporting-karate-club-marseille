'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { UserRole } from '@prisma/client';

interface BackOfficeProtectionProps {
  children: React.ReactNode;
}

export function BackOfficeProtection({ children }: BackOfficeProtectionProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Check immediately once auth is loaded (don't wait for mount)
    if (isLoading) return;

    // No user - redirect to login
    if (!user) {
      router.replace('/login');
      return;
    }

    // ADHERENT - redirect to home IMMEDIATELY
    if ((user as any)?.role === UserRole.ADHERENT) {
      // Use window.location for instant redirect that won't show /back-office URL
      window.location.href = '/';
      return;
    }

    // ADMIN or PUBLISHER - allow access (don't redirect)
  }, [isLoading, user, router]);

  // While loading auth, show nothing (prevents URL display)
  if (isLoading || !user) {
    return null;
  }

  // If ADHERENT, return null (redirect is in effect)
  if ((user as any)?.role === UserRole.ADHERENT) {
    return null;
  }

  // Authorized - render children
  return <>{children}</>;
}
