'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Modal from './modal';
import LoginModal from './loginModal';
import SignUpModal from './signUpModal';

export default function Navbar() {
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

  return (
    <nav className='flex items-center justify-between p-4 bg-white shadow-md'>
      <div className='flex items-center space-x-2'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/Netsim-logo.svg'
            alt='NETSIM Logo'
            width={60}
            height={60}
            priority
          />
          <span className='text-xl font-bold'>NETSIM</span>
        </Link>
      </div>
      <div className='space-x-2'>
        <Button variant='outline' onClick={openLoginModal}>
          Login
        </Button>
        <Button onClick={openSignUpModal}>Sign Up</Button>
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
