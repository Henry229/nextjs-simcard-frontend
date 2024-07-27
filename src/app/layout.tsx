import React from 'react';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/navbar';
import './globals.css';
import ClientLayout from '@/components/clientLayout';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body>
        <Navbar />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
