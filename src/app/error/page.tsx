'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    console.log('Auth error:', error);
  }, [error]);

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>An error occurred during authentication: {error}</p>
    </div>
  );
}
