'use client';

import { redirect } from 'next/navigation';
import { Button } from '../ui/button';

export default function SignupButton() {
  return (
    <Button
      onClick={() => redirect('/registrazione')}
      className="bg-linear-to-br w-fit rounded-none flex items-center from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
      Registra nuovo utente
    </Button>
  );
}
