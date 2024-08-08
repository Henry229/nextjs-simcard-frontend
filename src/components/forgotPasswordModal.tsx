import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Reset Your Password
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
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
        <Button type='submit' className='w-full'>
          Send Reset Link
        </Button>
      </form>
      {message && <p className='mt-2 text-sm text-green-600'>{message}</p>}
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
      <Button onClick={onClose} variant='link' className='mt-4 w-full'>
        Back to Login
      </Button>
    </div>
  );
};

export default ForgotPasswordModal;
