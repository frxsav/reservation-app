'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { signIn } from 'next-auth/react';
import { useRouter, redirect } from 'next/navigation';

const formSchema = z.object({
  email: z
    .email('Inserisci Mail valida')
    .min(3, "La mail dev'essere almeno di 3 lettere"),
  password: z.string().min(6, "La Password dev'essere almeno di 6 lettere"),
});

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const singInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      // Senza redirect: false non si può fare un redirect custom dopo il login
      redirect: false,
    });
    if (singInData?.error) {
      console.info(singInData.error);
    } else {
      router.refresh();
      router.push('/admin');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-stone-200 text-foreground placeholder:text-foreground/90 text-lg"
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
                  className="bg-stone-200 text-foreground placeholder:text-foreground/90 placeholder:text-base placeholder:font-normal text-2xl font-bold"
                  type="password"
                  placeholder="La tua Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="m-0 bg-linear-to-br w-full rounded-none flex mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
          Login
        </Button>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly text-stone-200 before:mr-4 before:block before:h-px before:grow before:bg-stone-200 after:ml-4 after:block after:h-px after:grow after:bg-stone-200">
          o
        </div>
        <Button
          type="button"
          onClick={() => {
            redirect(`${window.location.origin}/registrazione`);
          }}
          className="bg-linear-to-br w-full rounded-none flex mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-5 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
          Registrazione
        </Button>
      </form>
    </Form>
  );
}
