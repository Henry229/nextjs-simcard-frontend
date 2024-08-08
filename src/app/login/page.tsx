'use client';

import LoginModal from '@/components/loginModal';
import React from 'react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <LoginModal onClose={handleClose} onSignUpClick={handleSignUpClick} />
    </div>
  );
};

export default LoginPage;
