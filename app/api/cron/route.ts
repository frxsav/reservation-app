import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 0
export async function GET(request: NextRequest) {
  // 1. Controllo di sicurezza: Vercel invia un header con il segreto
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Non autorizzato', { status: 401 });
  }
  // afadfa f

  // 2. Chiamata al database per risvegliarlo così che Supabase non lo disattiva per inattività
  // La chiamata chiede quante righe ci sono nella tabella "user"
  await prisma.user.count();
  return NextResponse.json({ message: 'Database has been awakened!' });
}
