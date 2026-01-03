import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';

export default async function GetCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
