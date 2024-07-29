'use client';

import { useState, useEffect } from 'react';
import { getDevices } from '@/app/api/simCardAPi';

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
    async function fetchDevices() {
      try {
        const fetchedDevices = await getDevices();
        setDevices(fetchedDevices);
        setLoading(false);
      } catch (err) {
        setError('Error fetching devices');
        setLoading(false);
      }
    }

    fetchDevices();
  }, []);

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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
