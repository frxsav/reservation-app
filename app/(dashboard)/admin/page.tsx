import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';
import BookingForm from '@/components/form/BookingForm';
import { getServerSession } from 'next-auth';

export default async function Admin() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen flex flex-col items-center mt-24 gap-12">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold text-green">{session?.user?.role}</span>
        <h1 className="text-3xl text-background font-bold text-shadow-md text-shadow-dark">
          {session?.user
            ? `Benvenuto ${session?.user?.name}`
            : `Esegui il login per vedere questa pagina`}
        </h1>
      </div>
      <div className="p-4 border-2 border-green flex flex-col items-center gap-8 bg-stone/80 backdrop-blur-xs">
        <span className='text-background text-xl'>Compila il form per creare una nuova prenotazione</span>
        <BookingForm />
      </div>
    </div>
  );
}
