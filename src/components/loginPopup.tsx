import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginPopupProps {
  onLogin: (username: string, password: string) => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='username' className='text-sm font-medium'>
              Username
            </label>
            <Input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='password' className='text-sm font-medium'>
              Password
            </label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPopup;
