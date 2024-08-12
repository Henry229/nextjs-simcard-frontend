import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import { signIn } from '@/app/api/authApi';

// 사용자 정의 User 타입 선언
declare module 'next-auth' {
  interface User {
    id: string;
  }
  interface Session {
    user: User & {
      id: string;
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
          const user = await signIn(credentials.email, credentials.password);
          console.log('@@@@ User:', user);
          return user;
          // const res = await axios.post(
          //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`,
          //   {
          //     email: credentials.email,
          //     password: credentials.password,
          //   }
          // );
          // return res.data;
        } catch (error) {
          // if (axios.isAxiosError(error)) {
          //   throw new Error(
          //     error.response?.data?.message || 'Failed to authenticate'
          //   );
          // }
          // throw error;
          throw new Error(
            'Authentication failed : Eamil or password is incorrect'
          );
        }
      },
    }),
  ],
  // debug: true, // 디버그 모드 활성화
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error', // 커스텀 에러
  },
};

export default NextAuth(authOptions);
