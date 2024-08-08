'use client';

import SignUpModal from '@/components/signUpModal';
import React from 'react';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <SignUpModal onClose={handleClose} onLoginClick={handleLoginClick} />
    </div>
  );
};

export default SignUpPage;
