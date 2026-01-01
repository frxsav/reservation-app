import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function Admin() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <span className="text-2xl text-emerald-600">{session?.user?.role}</span>
      <h1 className="text-3xl text-background font-bold">
        {session?.user
          ? `Benvenuto ${session?.user?.name}`
          : `Esegui il login per vedere questa pagina`}
      </h1>
    </div>
  );
}
