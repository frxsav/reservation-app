'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter, redirect } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  name: z.string().min(3, "L'Username dev'essere almeno di 3 lettere.").max(20),
  email: z
    .email('Inserisci Mail valida')
    .min(3, "La mail dev'essere almeno di 3 lettere"),
  password: z.string().min(6, "La Password dev'essere almeno di 6 lettere"),
  role: z.enum(Role),
});

export default function SignUpForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      }),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      console.error('La registrazione non è andata a buon fine.');
    }
  };
  return (
    <>
      {session ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-stone-200 text-foreground placeholder:text-foreground/90"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      className="bg-stone-200 text-foreground placeholder:text-foreground/90"
                      placeholder="email@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-stone-200 text-foreground placeholder:text-foreground/90 placeholder:text-base text-2xl placeholder:font-normal font-bold"
                      type="password"
                      placeholder="La tua Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruolo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="CLIENT" id="CLIENT" />
                        <Label
                          className="data-[error=true]:text-destructive text-lg text-stone-100"
                          htmlFor="CLIENT">
                          Visitatore
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="STAFF" id="STAFF" />
                        <Label
                          className="data-[error=true]:text-destructive text-lg text-stone-100"
                          htmlFor="STAFF">
                          Staff
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="m-0 bg-linear-to-br w-full rounded-none flex mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
              Registra nuovo utente
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl text-background">
            Accedi con un&apos;utenza{' '}
            <span className="text-emerald-600">ADMIN</span> per registrare un
            nuovo utente
          </h1>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly text-stone-200 before:mr-4 before:block before:h-px before:grow before:bg-stone-200 after:ml-4 after:block after:h-px after:grow after:bg-stone-200">
            O
          </div>
          <Button
            type="button"
            onClick={() => {
              redirect(`${window.location.origin}/login`);
            }}
            className="bg-linear-to-br w-full rounded-none flex mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
            Accedi
          </Button>
        </div>
      )}
    </>
  );
}
