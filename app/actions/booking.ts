'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBooking(formData: {
  name: string;
  email: string;
  people: number;
  date: Date;
}) {
  try {
    await prisma.booking.create({
      data: {
        name: formData.name,
        email: formData.email,
        people: formData.people,
        date: formData.date,
      },
    });
    // Aggiorna la pagina con la tabella delle prenotazioni
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Errore durante la prenotazione: ' + error,
    };
  }
}
