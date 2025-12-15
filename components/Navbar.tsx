import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-between px-32 py-4 bg-stone-900 fixed top-0 w-full border-b border-background/50">
      <Link href={'/'}>
        <Image src={'vercel.svg'} width={50} height={50} alt="Logo" />
      </Link>
      {!session?.user ? (
        <Link
          href={'/login'}
          className="text-center items-center bg-linear-to-br rounded-none flex justify-center font-semibold from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-2 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
          Accedi
        </Link>
      ) : (
        <LogoutButton />
      )}
    </nav>
  );
}
