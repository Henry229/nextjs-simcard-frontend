import React from 'react';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/navbar';
import './globals.css';
import ClientLayout from '@/components/clientLayout';
import { Metadata } from 'next';
import { SimProvider } from './contexts/simContext';

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
        <SimProvider>
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
        </SimProvider>
      </body>
    </html>
  );
}

// // 원치 않는 속성 제거
// export function generateHtml(html: string) {
//   return html.replace(
//     /(?:data-new-gr-c-s-check-loaded|data-gr-ext-installed|cz-shortcut-listen)="[^"]*"/g,
//     ''
//   );
// }
