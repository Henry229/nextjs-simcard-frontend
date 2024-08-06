'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignUpModal: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push('/login'); // Redirect to login page after successful signup
      } else {
        const data = await res.json();
        setError(data.message || 'An error occurred during signup');
      }
    } catch (error) {
      console.error(error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
        <h3 className='text-2xl font-bold text-center'>Create a new account</h3>
        <form onSubmit={handleSubmit}>
          <div className='mt-4'>
            <div>
              <label className='block' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                placeholder='Name'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='mt-4'>
              <label className='block' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                placeholder='Email'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mt-4'>
              <label className='block'>Password</label>
              <input
                type='password'
                placeholder='Password'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex items-baseline justify-between'>
              <button className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'>
                Sign Up
              </button>
            </div>
          </div>
        </form>
        {error && <p className='text-red-500 text-xs italic mt-4'>{error}</p>}
      </div>
    </div>
  );
};

export default SignUpModal;
