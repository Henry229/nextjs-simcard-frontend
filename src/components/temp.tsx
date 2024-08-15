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
import { BiEdit } from 'react-icons/bi';

export default function Navbar() {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

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

  return (
    <nav className='flex items-center justify-between p-4 bg-background text-foreground shadow-md'>
      {/* ... (previous code) ... */}
      <div className='flex items-center space-x-2'>
        {session ? (
          <div className='flex items-center space-x-4'>
            {isAdmin && (
              <Link href='/users'>
                <Button variant='ghost' className='p-2'>
                  <BiEdit className='h-5 w-5' />
                </Button>
              </Link>
            )}
            {/* ... (rest of the code) ... */}
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
      {/* ... (modal components) ... */}
    </nav>
  );
}
