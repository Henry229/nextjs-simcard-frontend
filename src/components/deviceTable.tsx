'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

import { getDevices } from '@/app/api/simCardAPi';
import { changeJasperStatus } from '@/app/api/jasperApi';

type Device = {
  id: string;
  iccid: string;
  status: string;
  ratePlan: string;
  communicationPlan: string;
  gps: boolean;
};

export default function DeviceTable() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const fetchedDevices = await getDevices();
      setDevices(fetchedDevices);
      setLoading(false);
    } catch (err) {
      setError('Error fetching devices');
      setLoading(false);
    }
  };

  const changeStatus = async (
    iccid: string,
    newStatus: 'ACTIVATED' | 'DEACTIVATED'
  ) => {
    try {
      const statusData = await changeJasperStatus(iccid, newStatus);
      // await axios.put(`/api/devices/${iccid}/status`, { status: newStatus });
      fetchDevices(); // 상태 변경 후 디바이스 목록 새로고침
    } catch (err) {
      console.error('Error changing device status:', err);
      setError('Error changing device status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table className='min-w-full bg-white'>
      <thead>
        <tr>
          <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            ICCID
          </th>
          <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Status
          </th>
          <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Rate Plan
          </th>
          <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Communication Plan
          </th>
          <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            GPS
          </th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td className='px-6 py-4 whitespace-nowrap'>{device.iccid}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{device.status}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{device.ratePlan}</td>
            <td className='px-6 py-4 whitespace-nowrap'>
              {device.communicationPlan}
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              {device.gps ? 'Yes' : 'No'}
            </td>
            <td>
              <Button
                className='bg-indigo-800 text-white hover:bg-indigo-950'
                onClick={() => changeStatus(device.iccid, 'ACTIVATED')}
                disabled={device.status === 'ACTIVATED'}
              >
                Activate
              </Button>
            </td>
            <td>
              <Button
                className='bg-rose-600 text-white hover:bg-rose-900'
                onClick={() => changeStatus(device.iccid, 'DEACTIVATED')}
                disabled={device.status === 'DEACTIVATED'}
              >
                Deactivate
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
