'use client';

import LogoutButton from './buttons/LogoutButton';
import { useSession } from 'next-auth/react';
import LoginButton from './buttons/LoginButton';

export default function NavbarButton() {
  const { data: session } = useSession();
  return <>{session ? <LogoutButton /> : <LoginButton />}</>;
}
