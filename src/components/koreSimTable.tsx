'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSimContext } from '@/app/contexts/simContext';
import {
  getAllKoreDevices,
  changeKoreDeviceStatus,
  searchKoreDeviceByIccid,
} from '@/app/api/koreApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ACCOUNT_ID = 'cmp-pp-org-4611';

interface KoreDevice {
  iccid: string;
  subscription_id: string;
  state: string;
}

const STATES = [
  'Stock',
  'Active',
  'Suspend',
  'Suspend With Charge',
  'Deactivated',
  'Pending Scrap',
  'Scrapped',
  'Barred',
];

export default function KoreSimTable() {
  const { koreDevices, setKoreDevices } = useSimContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredDevices, setFilteredDevices] = useState<KoreDevice[]>([]); // Initialize with empty array
  const [selectedState, setSelectedState] = useState<string>('all');
  const [searchIccid, setSearchIccid] = useState('');
  const [searchResult, setSearchResult] = useState<KoreDevice | null>(null);

  const fetchKoreDevices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllKoreDevices();
      setKoreDevices(response.simCards);
    } catch (err) {
      console.error('Error fetching KORE devices:', err);
      setError('Failed to fetch KORE devices');
    }
    setLoading(false);
  }, [setKoreDevices]);

  useEffect(() => {
    fetchKoreDevices();
  }, [fetchKoreDevices]);

  useEffect(() => {
    // console.log('koreDevices:', koreDevices);
    // console.log('selectedState:', selectedState);
    // console.log('searchResult:', searchResult);

    let result = koreDevices;
    if (selectedState !== 'all') {
      result = result.filter((device) => device.state === selectedState);
    }
    if (searchResult) {
      result = [searchResult];
    }
    // console.log('Filtered result:', result);
    setFilteredDevices(result);
  }, [koreDevices, selectedState, searchResult]);

  const handleStatusChange = async (
    subscriptionId: string,
    newStatus: 'active' | 'deactivated'
  ) => {
    try {
      await changeKoreDeviceStatus(subscriptionId, newStatus);
      fetchKoreDevices();
    } catch (err) {
      console.error('Error changing device status:', err);
      setError('Failed to change device status');
    }
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSearchResult(null);
    setSearchIccid('');
  };

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

  if (loading) return <div>Loading KORE devices...</div>;
  if (error) return <div>Error: {error}</div>;

  // console.log('filteredDevices before rendering:', filteredDevices);

  return (
    <div>
      <div className='flex mb-4 gap-2'>
        <Input
          type='text'
          placeholder='Search by ICCID'
          value={searchIccid}
          onChange={(e) => setSearchIccid(e.target.value)}
          className='flex-grow'
        />
        <Button onClick={handleSearch}>Search</Button>
        {searchResult && <Button onClick={clearSearch}>Clear Search</Button>}
      </div>

      <Select onValueChange={handleStateChange} value={selectedState}>
        <SelectTrigger className='w-[180px] mb-4'>
          <SelectValue placeholder='Filter by state' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All States</SelectItem>
          {STATES.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ICCID</TableHead>
            <TableHead>Subscription ID</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(filteredDevices) && filteredDevices.length > 0 ? (
            filteredDevices.map((device: KoreDevice) => (
              <TableRow key={device.subscription_id}>
                <TableCell>{device.iccid}</TableCell>
                <TableCell>{device.subscription_id}</TableCell>
                <TableCell>{device.state}</TableCell>
                <TableCell>
                  <Button
                    className='bg-indigo-800 text-white hover:bg-indigo-950 mr-2'
                    onClick={() =>
                      handleStatusChange(device.subscription_id, 'active')
                    }
                    disabled={device.state === 'Active'}
                  >
                    Activate
                  </Button>
                  <Button
                    className='bg-rose-600 text-white hover:bg-rose-900'
                    onClick={() =>
                      handleStatusChange(device.subscription_id, 'deactivated')
                    }
                    disabled={device.state === 'Deactivated'}
                  >
                    Deactivate
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No devices found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
