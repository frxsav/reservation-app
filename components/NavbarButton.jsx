'use client';

import LogoutButton from './buttons/LogoutButton';
import { useSession } from 'next-auth/react';
import LoginButton from './buttons/LoginButton';
import SignupButton from './buttons/SignupButton';

export default function NavbarButton() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-end gap-4">
      {session?.user?.role === 'ADMIN' ? <SignupButton /> : null}
      {session ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
