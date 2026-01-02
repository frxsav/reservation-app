import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';
import BookingForm from '@/components/form/BookingForm';
import { getServerSession } from 'next-auth';

export default async function Admin() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center">
        <span className="text-2xl text-emerald-600">{session?.user?.role}</span>
        <h1 className="text-3xl text-background font-bold">
          {session?.user
            ? `Benvenuto ${session?.user?.name}`
            : `Esegui il login per vedere questa pagina`}
        </h1>
      </div>
      <div className="p-4 border border-emerald-600/75 flex flex-col items-center gap-8">
        <span className='text-background text-xl'>Compila il form per creare una nuova prenotazione</span>
        <BookingForm />
      </div>
    </div>
  );
}
