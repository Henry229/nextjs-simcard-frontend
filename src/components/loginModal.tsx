import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ForgotPasswordModal from './forgotPasswordModal';

interface LoginModalProps {
  onClose: () => void;
  onSignUpClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      onClose();
      router.replace('/dashboard');
    }
  }, [status, onClose, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
      } else if (res?.url) {
        router.push(res.url);
      }
    } catch (error) {
      console.error('Login error', error);
      setError('An unexpected error occurred');
    }
  };

  const handleSignUpLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSignUpClick();
  };

  const handleForgotPasswordClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  if (showForgotPassword) {
    return <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className='w-full max-w-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Sign in to your account
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
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
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='h-4 w-4 text-primary focus:ring-primary border-input rounded'
            />
            <label htmlFor='remember-me' className='ml-2 block text-sm'>
              Remember me
            </label>
          </div>
          <div className='text-sm'>
            <a
              href='#'
              onClick={handleForgotPasswordClick}
              className='font-medium text-primary hover:text-primary/80'
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <Button type='submit' className='w-full'>
          Sign in
        </Button>
      </form>
      {error && <p className='mt-2 text-sm text-destructive'>{error}</p>}
      <p className='mt-4 text-center text-sm text-muted-foreground'>
        Don&apos;t have an account?{' '}
        <Link
          href='/signup'
          onClick={handleSignUpLinkClick}
          className='font-medium text-primary hover:text-primary/80'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginModal;
