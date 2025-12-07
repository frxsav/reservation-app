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

const formSchema = z.object({
  username: z.string().min(3, "L'Username dev'essere almeno di 3 lettere.").max(20),
  email: z
    .email('Inserisci Mail valida')
    .min(3, "La mail dev'essere almeno di 3 lettere"),
  password: z.string().min(6, "La Password dev'essere almeno di 6 lettere"),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-xl italic">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-white/50 text-black placeholder:text-black/75"
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
              <FormLabel className="text-white text-xl italic">Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-white/50 text-black placeholder:text-black/75"
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
              <FormLabel className="text-white text-xl italic">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-white/50 text-black placeholder:text-black/75"
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
          className="bg-white/75 text-black text-xl p-4 hover:bg-white hover:text-black cursor-pointer transition-colors duration-300">
          Registrati
        </Button>
      </form>
    </Form>
  );
}
