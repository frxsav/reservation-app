'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createBooking } from '@/app/actions/booking';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const formSchema = z.object({
  name: z.string().min(5),
  email: z
    .email('Inserisci Mail valida')
    .min(3, "La mail dev'essere almeno di 3 lettere"),
  // z.coerce non funziona
  people: z
    .transform(Number)
    .pipe(
      z
        .number()
        .min(1)
        .max(15, 'Per prenotare per più di 15 persone contattaci!')
    ),
  date: z.date(),
});

export default function BookingForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      people: undefined,
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.info('values: ', values);
    const res = await createBooking({ ...values, date: new Date(values.date) });
    if (res.success) alert('Prenotazione inviata!');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="bg-stone-200 text-foreground placeholder:text-foreground/90 text-lg"
                  placeholder="Il tuo nome"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-stone-200 text-foreground placeholder:text-foreground/90 text-lg"
                  placeholder="La tua mail"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-end justify-between">
          <FormField
            control={form.control}
            name="people"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero di Persone</FormLabel>
                <FormControl>
                  <Input
                    className="bg-stone-200 text-foreground placeholder:text-foreground/90 text-lg w-64"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Prenotazione</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal rounded-none bg-stone-100 w-64">
                        {field.value
                          ? field.value.toLocaleDateString()
                          : 'Select date'}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="mt-12 bg-linear-to-br w-full rounded-none flex mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
          Prenota Ora
        </Button>
      </form>
    </Form>
  );
}
