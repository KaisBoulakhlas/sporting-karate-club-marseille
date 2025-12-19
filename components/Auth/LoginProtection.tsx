import { getServerSession } from '@/lib/auth-better';
import { redirect } from 'next/navigation';

interface LoginProtectionProps {
  children: React.ReactNode;
}

export async function LoginProtection({ children }: LoginProtectionProps) {
  const session = await getServerSession();

  // If already logged in, redirect to home
  if (session && session.user) {
    redirect('/');
  }

  return <>{children}</>;
}
