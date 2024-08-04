'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSimContext } from '@/app/contexts/simContext';
import { getAllKoreDevices, changeKoreDeviceStatus } from '@/app/api/koreApi';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ACCOUNT_ID = 'cmp-pp-org-4611';

interface KoreDevice {
  iccid: string;
  subscription_id: string;
  state: string;
}

interface KoreSimTableProps {
  searchResult: KoreDevice | null;
}

export default function KoreSimTable({ searchResult }: KoreSimTableProps) {
  const { koreDevices, setKoreDevices } = useSimContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKoreDevices = useCallback(async () => {
    try {
      const response = await getAllKoreDevices();
      setKoreDevices(response.simCards);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching KORE devices:', err);
      setError('Failed to fetch KORE devices');
      setLoading(false);
    }
  }, [setKoreDevices]);

  useEffect(() => {
    if (!searchResult) {
      fetchKoreDevices();
    } else {
      setLoading(false);
    }
  }, [searchResult, fetchKoreDevices]);

  const handleStatusChange = async (
    subscriptionId: string,
    newStatus: 'ACTIVATED' | 'DEACTIVATED'
  ) => {
    try {
      await changeKoreDeviceStatus(subscriptionId, newStatus);
      // Refresh the device list after status change
      if (!searchResult) {
        fetchKoreDevices();
      }
    } catch (err) {
      console.error('Error changing device status:', err);
      setError('Failed to change device status');
    }
  };

  if (loading) return <div>Loading KORE devices...</div>;
  if (error) return <div>Error: {error}</div>;

  const devicesToDisplay = searchResult ? [searchResult] : koreDevices;

  if (!devicesToDisplay || devicesToDisplay.length === 0)
    return <div>No KORE devices found.</div>;

  return (
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
        {devicesToDisplay.map((device: KoreDevice) => (
          <TableRow key={device.subscription_id}>
            <TableCell>{device.iccid}</TableCell>
            <TableCell>{device.subscription_id}</TableCell>
            <TableCell>{device.state}</TableCell>
            <TableCell>
              <Button
                className='bg-indigo-800 text-white hover:bg-indigo-950 mr-2'
                onClick={() =>
                  handleStatusChange(device.subscription_id, 'ACTIVATED')
                }
                disabled={device.state === 'ACTIVATED'}
              >
                Activate
              </Button>
              <Button
                className='bg-rose-600 text-white hover:bg-rose-900'
                onClick={() =>
                  handleStatusChange(device.subscription_id, 'DEACTIVATED')
                }
                disabled={device.state === 'DEACTIVATED'}
              >
                Deactivate
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
