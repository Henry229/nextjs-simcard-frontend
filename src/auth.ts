import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { signIn } from '@/app/api/authApi';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    roleId: number;
  }
  interface Session {
    user: User & {
      role: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('**** Authorize function called', credentials);
        console.log('**** Request object:', req);

        if (!credentials?.email || !credentials?.password) {
          console.log('Email or password missing');
          throw new Error('Email and password are required');
          // return null;
        }
        try {
          const response = await signIn(
            credentials.email,
            credentials.password
          );
          if (response && response.token) {
            const { token } = response;
            return {
              id: token.id,
              email: token.email,
              name: token.name,
              roleId: token.roleId,
            };
          }
          // const res = await axios.post(
          //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`,
          //   {
          //     email: credentials.email,
          //     password: credentials.password,
          //   }
          // );
          // return res.data;
          return null;
        } catch (error) {
          // if (axios.isAxiosError(error)) {
          //   throw new Error(
          //     error.response?.data?.message || 'Failed to authenticate'
          //   );
          // }
          // throw error;
          // throw new Error(
          // 'Authentication failed : Eamil or password is incorrect'

          // );
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.roleId = user.roleId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.roleId = token.roleId as number;
        session.user.role = token.roleId === 1 ? 'admin' : 'readonly';
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);
