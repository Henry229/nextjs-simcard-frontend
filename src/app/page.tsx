'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginPopup from '@/components/loginPopup';

export default function HomePage() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    setIsLoggingIn(true);
    // TODO: Implement actual login logic here
    // For now, we'll simulate a successful login after a short delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoggingIn(false);

    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
      <LoginPopup onLogin={handleLogin} />
      {isLoggingIn && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='text-white text-2xl'>Logging in...</div>
        </div>
      )}
    </div>
  );
}
