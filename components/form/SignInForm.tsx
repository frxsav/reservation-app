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
  username: z.string().min(3, "L'Username dev'essere almeno di 3 lettere."),
  email: z.email('Inserisci Mail valida').min(3, "La mail dev'essere almeno di 3 lettere"),
  password: z.string().min(6, "La Password dev'essere almeno di 6 lettere")
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export default function SignInForm() {
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
                  type="text"
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
          Log In
        </Button>
      </form>
    </Form>
    // <form onSubmit={handleSubmit} className="flex flex-col">
    //   <div className="flex flex-col bg-amber-100 p-4">
    //     <label className="text-2xl italic text-slate-950" htmlFor="username">
    //       Username
    //     </label>
    //     <input className="bg-white p-3" type="text" name="username" />
    //   </div>
    //   <div className="flex flex-col bg-amber-100 p-4">
    //     <label className="text-2xl italic text-slate-950" htmlFor="email">
    //       Email
    //     </label>
    //     <input className="bg-white p-3" type="email" name="email" />
    //   </div>
    //   <div className="flex flex-col bg-amber-100 p-4">
    //     <label className="text-2xl italic text-slate-950" htmlFor="password">
    //       Password
    //     </label>
    //     <input className="bg-white p-3 text-black" type="password" name="password" />
    //   </div>
    //   <button type="submit" className="bg-red-700 cursor-pointer hover:bg-red-900 transition-colors duration-300 text-2xl p-2 w-[30%]">Login</button>
    // </form>
  );
}
