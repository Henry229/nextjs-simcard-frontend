'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { signUp } from '@/app/api/authApi';

interface SignUpModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const data = await signUp(name, email, password);
      setSuccessMessage(
        data.message || 'Sign up successful! You can now log in.'
      );
      setTimeout(() => {
        onClose();
        onLoginClick();
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleLoginLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default link behavior
    onLoginClick(); // Call the provided onLoginClick function
  };

  return (
    <div className='w-full max-w-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Create a new account
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium mb-2'>
            Name
          </label>
          <Input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>
            Email address
          </label>
          <Input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium mb-2'>
            Password
          </label>
          <Input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type='submit' className='w-full'>
          Sign up
        </Button>
      </form>
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
      <p className='mt-4 text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link
          href='#'
          className='font-medium text-indigo-600 hover:text-indigo-500'
          onClick={handleLoginLinkClick}
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUpModal;
