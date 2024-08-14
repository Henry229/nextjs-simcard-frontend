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
import Pagination from './pagination';
import { IoIosFlash } from 'react-icons/io';
import { IoIosFlashOff } from 'react-icons/io';

const ACCOUNT_ID = 'cmp-pp-org-4611';

interface KoreDevicesResponse {
  simCards: KoreSimTableDevice[];
}

interface KoreSimTableDevice {
  iccid: string;
  subscription_id: string;
  state: string;
  msisdn: string;
  imsi: string;
  data_usage?: number;
  sms_usage?: number;
  voice_usage?: number;
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

const ITEMS_PER_PAGE = 10;

export default function KoreSimTable() {
  const { koreDevices, setKoreDevices } = useSimContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredDevices, setFilteredDevices] = useState<KoreSimTableDevice[]>(
    []
  );
  const [selectedState, setSelectedState] = useState<string>('all');
  const [searchIccid, setSearchIccid] = useState('');
  const [searchResult, setSearchResult] = useState<KoreSimTableDevice | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const fetchKoreDevices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllKoreDevices();
      setKoreDevices(response);
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
    if (!koreDevices || !Array.isArray(koreDevices.simCards)) {
      console.error('koreDevices.simCards is not an array:', koreDevices);
      setFilteredDevices([]);
      return;
    }

    let result = koreDevices.simCards;
    if (selectedState !== 'all') {
      result = result.filter(
        (device: KoreSimTableDevice) => device.state === selectedState
      );
    }
    if (searchResult) {
      result = [searchResult];
    }
    setFilteredDevices(result);
    setCurrentPage(1);
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
    setCurrentPage(1);
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
        setFilteredDevices([response.simCards[0]]);
        setError(null);
      } else {
        setSearchResult(null);
        setFilteredDevices([]);
        setError('No device found with the given ICCID');
      }
    } catch (err) {
      console.error('Error searching KORE device:', err);
      setError('Failed to search for the device');
      setSearchResult(null);
      setFilteredDevices([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchIccid('');
    setSearchResult(null);
    setError(null);
    setFilteredDevices(koreDevices?.simCards || []);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <div>Loading KORE devices...</div>;
  if (error) return <div>Error: {error}</div>;

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
            <TableHead>MSISDN</TableHead>
            <TableHead>IMSI</TableHead>
            <TableHead>DATA-USAGE</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedDevices.length > 0 ? (
            paginatedDevices.map((device: KoreSimTableDevice) => (
              <TableRow key={device.subscription_id}>
                <TableCell>{device.iccid}</TableCell>
                <TableCell>{device.subscription_id}</TableCell>
                <TableCell>{device.state}</TableCell>
                <TableCell>{device.msisdn}</TableCell>
                <TableCell>{device.imsi}</TableCell>
                <TableCell>{device.data_usage}</TableCell>
                <TableCell>
                  <Button
                    className='bg-indigo-800 text-white hover:bg-indigo-950 mr-2'
                    onClick={() =>
                      handleStatusChange(device.subscription_id, 'active')
                    }
                    disabled={device.state === 'Active'}
                  >
                    <IoIosFlash />
                  </Button>
                  <Button
                    className='bg-rose-600 text-white hover:bg-rose-900'
                    onClick={() =>
                      handleStatusChange(device.subscription_id, 'deactivated')
                    }
                    disabled={device.state === 'Deactivated'}
                  >
                    <IoIosFlashOff />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No devices found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
