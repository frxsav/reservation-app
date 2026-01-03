import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import GetCurrentUser from '@/lib/auth';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function BookingsPage() {
  const user = await GetCurrentUser();
  if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF')) {
    redirect('/');
  }

  const prenotazioni = await prisma.booking.findMany({
    orderBy: {
      date: 'asc',
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gestione Prenotazioni</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Persone</TableHead>
            <TableHead>Data e Ora</TableHead>
            {user.role === 'ADMIN' && (
              <TableHead className="text-right"></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {prenotazioni.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                Nessuna prenotazione trovata.
              </TableCell>
            </TableRow>
          ) : (
            prenotazioni.map((prenotazione) => (
              <TableRow key={prenotazione.id}>
                <TableCell className="font-medium">
                  {prenotazione.name}
                </TableCell>
                <TableCell>{prenotazione.email}</TableCell>
                <TableCell>{prenotazione.people}</TableCell>
                <TableCell>
                  {/* Formattiamo la data per l'Italia */}
                  {prenotazione.date.toLocaleString('it-IT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                {user.role === 'ADMIN' && (
                  <TableCell className="text-right">
                    {/* Qui potrai mettere un bottone per cancellare o modificare */}
                    <button className="text-red-600 hover:underline cursor-pointer">
                      Elimina
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
