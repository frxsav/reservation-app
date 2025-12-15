'use client';

import { Button } from './ui/button';
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
      className="bg-linear-to-br w-fit rounded-none flex mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
      Logout
    </Button>
  );
}
