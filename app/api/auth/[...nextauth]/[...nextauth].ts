import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { compareSync } from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { getUserById } from '../../user/user';
import { Role } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
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
        console.info('user: ', existingUser);
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
          name: existingUser.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      // check sull'id
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      // check se l'utente esiste
      if (!existingUser) return token;
      // passaggio del token alla session sotto (jwt -> session)
      token.role = existingUser.role;
      return token;
    },
    async session({ session, token }) {
      // si aggiunge il ruolo allo user della session se presente nel token di jwt
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
};
