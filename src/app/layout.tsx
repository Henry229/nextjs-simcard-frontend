import React from 'react';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/navbar';
import './globals.css';
import ClientLayout from '@/components/clientLayout';
import { Metadata } from 'next';
import { SimProvider } from './contexts/simContext';
import AuthProvider from '@/components/authProvider';
import { ThemeProvider } from './contexts/theme-provider';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SIM Management App',
  description: 'Manage your SIM cards efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AuthProvider>
            <SimProvider>
              <Navbar />
              <ClientLayout>{children}</ClientLayout>
            </SimProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
