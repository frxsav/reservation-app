import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { compareSync } from 'bcrypt';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Check se l'utente ha inserito sia mail che password
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check se la mail è associata ad un account
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser) return null;

        // Check se la password è quella giusta
        const passwordMatch = compareSync(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) return null;

        // Ritorna le info dell'utente come singole stringhe
        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          username: existingUser.username,
        };
      },
    }),
  ],
};
