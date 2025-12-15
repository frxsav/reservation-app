import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';
import LogoutButton from '@/components/LogoutButton';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Admin() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl text-background font-bold">
        {session?.user
          ? `Benvenuto ${session?.user?.name}`
          : `Esegui il login per vedere questa pagina`}
      </h1>
      {!session?.user ? (
        <Link
          href={'/login'}
          className="bg-linear-to-br w-fit rounded-none flex justify-center font-semibold mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-2 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
          Accedi
        </Link>
      ) : (
        <LogoutButton />
      )}
    </div>
  );
}
