import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between p-4 bg-white shadow-md'>
      <div className='flex items-center space-x-2'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image src='/logo.png' alt='NETSIM Logo' width={40} height={40} />
          <span className='text-xl font-bold'>NETSIM</span>
        </Link>
      </div>
      <div className='space-x-2'>
        <Button variant='outline' asChild>
          <Link href='/login'>Login</Link>
        </Button>
        <Button asChild>
          <Link href='/signUp'>SignUp</Link>
        </Button>
      </div>
    </nav>
  );
}
