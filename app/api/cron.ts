// import { createClient } from '@supabase/supabase-js';
// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   // 1. Verifica l'autorizzazione (Vercel invia il Bearer token automaticamente)
//   const authHeader = request.headers.get('authorization');
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response('Unauthorized', { status: 401 });
//   }

//   // 2. Inizializza Supabase
//   const supabase = createClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_ANON_KEY!
//   );

//   try {
//     // 3. Fai una query veloce (sostituisci 'profiles' con una tua tabella reale)
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('id')
//       .limit(1);

//     if (error) throw error;

//     return NextResponse.json({
//       success: true,
//       message: 'Supabase is awake!',
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         error: error,
//       },
//       { status: 500 }
//     );
//   }
// }
