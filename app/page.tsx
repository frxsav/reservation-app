import Link from 'next/link';
import GetCurrentUser from '@/lib/auth';

export default async function Home() {
  const user = await GetCurrentUser();
  return (
    <div className="flex flex-col gap-16 items-center justify-center h-screen">
      <h1 className="text-4xl text-background">Homepage</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <Link
          href={'/admin'}
          className="bg-linear-to-br w-fit rounded-none flex justify-center font-semibold mx-auto from-green to-green text-stone-100 text-xl px-6 py-2 uppercase tracking-wide hover:from-green hover:to-green cursor-pointer transition-colors duration-600">
          Aggiungi Prenotazione
        </Link>
        {user && (user.role === 'ADMIN' || user.role === 'STAFF') && (
          <Link
            href={'/prenotazioni'}
            className="bg-linear-to-br w-fit rounded-none flex justify-center font-semibold mx-auto from-green to-green text-stone-100 text-xl px-6 py-2 uppercase tracking-wide hover:from-green hover:to-green cursor-pointer transition-colors duration-600">
            Prenotazioni
          </Link>
        )}
      </div>
    </div>
  );
}
