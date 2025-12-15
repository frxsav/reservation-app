import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function Admin() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-3xl text-background font-bold">
        Benvenuto {session?.user?.name}
      </h1>
    </div>
  );
}
