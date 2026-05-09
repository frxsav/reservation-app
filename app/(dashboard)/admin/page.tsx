import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';
import BookingForm from '@/components/form/BookingForm';
import { getServerSession } from 'next-auth';

export default async function Admin() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen flex flex-col items-center mt-24 gap-12">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold text-green">
          {session?.user?.role}
        </span>
        <h1 className="text-4xl text-background font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.3)]">
          {session?.user
            ? `Benvenuto ${session?.user?.name}`
            : `Effettua il login per vedere questa pagina`}
        </h1>
      </div>
      {session?.user && (
        <div className="p-4 border-2 border-green flex flex-col items-center gap-8 bg-stone/80 backdrop-blur-xs">
          <span className="text-background text-xl">
            Compila il form per creare una nuova prenotazione
          </span>
          <BookingForm />
        </div>
      )}
    </div>
  );
}
