'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Modal from './modal';
import LoginModal from './loginModal';
import SignUpModal from './signUpModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from './theme-toggle';
// import { useTheme } from 'next-themes';
import { BiEdit } from 'react-icons/bi';

export default function Navbar() {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  // const { theme } = useTheme();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  const isAdmin = session?.user?.role === 'admin';
  console.log('>>>> session', session);
  console.log('>>>> session.user.email', session?.user.email);
  console.log('>>>> isAdmin', isAdmin);

  return (
    <nav className='flex items-center justify-between p-4 bg-background text-foreground shadow-md'>
      <div className='flex items-center space-x-2'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/NETSIM.svg'
            alt='NETSIM Logo'
            width={30}
            height={30}
            priority
          />
          <span className='text-xl font-bold'>NETSIM</span>
        </Link>
      </div>
      <div className='flex items-center space-x-2'>
        {session ? (
          <div className='flex items-center space-x-4'>
            {isAdmin && (
              <Button
                variant='ghost'
                onClick={() => {
                  /* TODO: Implement user edit functionality */
                }}
                className='p-2'
              >
                <BiEdit className='h-5 w-5' />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-8 w-8 rounded-full'
                >
                  <Avatar>
                    <AvatarImage
                      src={session.user?.image || ''}
                      alt={session.user?.name || ''}
                    />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  <Link href='/profile'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Button variant='outline' onClick={openLoginModal}>
              Login
            </Button>
            <Button onClick={openSignUpModal}>Sign Up</Button>
          </>
        )}
        <ThemeToggle />
      </div>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onSignUpClick={openSignUpModal}
        />
      </Modal>
      <Modal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <SignUpModal
          onClose={() => setIsSignUpModalOpen(false)}
          onLoginClick={openLoginModal}
        />
      </Modal>
    </nav>
  );
}
