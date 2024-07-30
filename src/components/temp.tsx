// src/components/DeviceTable.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

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
      const response = await axios.get('/api/devices');
      setDevices(response.data);
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
      await axios.put(`/api/devices/${iccid}/status`, { status: newStatus });
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
          <th>ICCID</th>
          <th>Status</th>
          <th>Rate Plan</th>
          <th>Communication Plan</th>
          <th>GPS</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.iccid}</td>
            <td>{device.status}</td>
            <td>{device.ratePlan}</td>
            <td>{device.communicationPlan}</td>
            <td>{device.gps ? 'Yes' : 'No'}</td>
            <td>
              <Button
                onClick={() => changeStatus(device.iccid, 'ACTIVATED')}
                disabled={device.status === 'ACTIVATED'}
              >
                Activate
              </Button>
              <Button
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
