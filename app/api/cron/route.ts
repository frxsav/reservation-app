import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  // 1. Controllo di sicurezza: Vercel invia un header con il segreto
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Non autorizzato', { status: 401 });
  }

  //   Questa chiamata viene effettuate ogni 3 giorni alle 05:00 da Vercel, come indicato da questa stringa in sintassi Cron in vercel.json:
  //   "schedule": "0 5 */3 * *"

  try {
    // 2. Chiamata al database per risvegliarlo così che Supabase non lo disattiva per inattività
    // La chiamata chiede quante righe ci sono nella tabella "user"
    await prisma.user.count();
    return NextResponse.json({
      success: true,
      message: 'Database has been awakened!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
