'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z
    .string()
    .min(3, "L'Username dev'essere almeno di 3 lettere.")
    .max(20),
  email: z
    .email('Inserisci Mail valida')
    .min(3, "La mail dev'essere almeno di 3 lettere"),
  password: z.string().min(6, "La Password dev'essere almeno di 6 lettere"),
});

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      console.error('La registrazione non è andata a buon fine.');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="bg-background/50 text-foreground placeholder:text-foreground/90"
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormDescription>Il tuo Username.</FormDescription>
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
                  className="bg-background/50 text-foreground placeholder:text-foreground/90"
                  placeholder="email@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>La tua Mail.</FormDescription>
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
                  className="bg-background/50 text-foreground placeholder:text-foreground/90"
                  type="password"
                  placeholder="La tua Password"
                  {...field}
                />
              </FormControl>
              <FormDescription>La tua Password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-emerald-400 text-foreground text-xl px-6 py-5 uppercase font-bold hover:bg-emerald-500 hover:text-foreground cursor-pointer transition-colors duration-300">
          Registrati
        </Button>
      </form>
    </Form>
  );
}
