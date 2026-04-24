'use client';

import { redirect } from 'next/navigation';
import { Button } from '../ui/button';

export default function SignupButton() {
  return (
    <Button
      onClick={() => redirect('/registrazione')}
      className="bg-green border-t-2 border-light-green w-fit rounded-none flex items-center text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:bg-dark-green cursor-pointer transition-colors duration-600">
      Registra nuovo utente
    </Button>
  );
}
