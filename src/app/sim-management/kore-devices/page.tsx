'use client';

import React, { useState } from 'react';
import KoreSimTable from '@/components/koreSimTable';
import { searchKoreDeviceByIccid } from '@/app/api/koreApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface KoreDevice {
  iccid: string;
  subscription_id: string;
  state: string;
}

export default function KoreSimsPage() {
  const [searchIccid, setSearchIccid] = useState('');
  const [searchResult, setSearchResult] = useState<KoreDevice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchIccid.trim()) {
      setError('Please enter an ICCID to search');
      return;
    }
    setLoading(true);
    try {
      const response = await searchKoreDeviceByIccid(searchIccid);
      if (response.simCards && response.simCards.length > 0) {
        setSearchResult(response.simCards[0]);
        setError(null);
      } else {
        setSearchResult(null);
        setError('No device found with the given ICCID');
      }
    } catch (err) {
      console.error('Error searching KORE device:', err);
      setError('Failed to search for the device');
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchIccid('');
    setSearchResult(null);
    setError(null);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>KORE SIM Cards</h1>
      <div className='flex mb-4'>
        <Input
          type='text'
          placeholder='Search by ICCID'
          value={searchIccid}
          onChange={(e) => setSearchIccid(e.target.value)}
          className='mr-2'
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
        {searchResult && (
          <Button onClick={clearSearch} className='ml-2'>
            Clear Search
          </Button>
        )}
      </div>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <KoreSimTable searchResult={searchResult} />
    </div>
  );
}
