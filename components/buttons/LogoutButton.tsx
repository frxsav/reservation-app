'use client';

import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
      className="bg-green w-fit rounded-none flex items-center border-t-2 border-light-green text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:bg-dark-green cursor-pointer transition-colors duration-600">
      Logout
    </Button>
  );
}
