'use client';

import { useState, useEffect } from 'react';
import { getDevices } from '@/app/api/simCardAPi';
import {
  changeJasperStatus,
  searchJasperDeviceByIccid,
} from '@/app/api/jasperApi';

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

interface JasperDevice {
  id: string;
  iccid: string;
  status: string;
  rate_plan: string;
  communication_plan: string;
  providers: string;
}

const STATUS = [
  'ACTIVATED',
  'ACTIVATION_READY',
  'DEACTIVATED',
  'INVENTORY',
  'PURGED',
  'REPLACED',
  'RETIRED',
  'TEST_READY',
];

export default function DeviceTable() {
  const [jasperDevices, setJasperDevices] = useState<JasperDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredDevices, setFilteredDevices] = useState<JasperDevice[]>([]);
  const [searchIccid, setSearchIccid] = useState('');
  const [searchResult, setSearchResult] = useState<JasperDevice | null>(null);
  const [selectedState, setSelectedState] = useState<string>('all');

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    let result = jasperDevices;
    if (selectedState !== 'all') {
      result = result.filter((device) => device.status === selectedState);
    }
    if (searchResult) {
      result = [searchResult];
    }
    setFilteredDevices(result);
  }, [jasperDevices, selectedState, searchResult]);

  const fetchDevices = async () => {
    try {
      const fetchedDevices = await getDevices();
      setJasperDevices(fetchedDevices);
      setLoading(false);
    } catch (err) {
      setError('Error fetching devices in deviceTable');
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
      console.error('Error changing device status in deviceTable:', err);
      setError('Error changing device status in deviceTable');
    }
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSearchResult(null);
    setSearchIccid('');
  };

  const handleSearch = async () => {
    if (!searchIccid.trim()) {
      setError('Please enter ICCID to search in deviceTable');
      return;
    }
    setLoading(true);
    try {
      const response = await searchJasperDeviceByIccid(searchIccid);
      if (response.simCards && response.simCards.length > 0) {
        setSearchResult(response.simCards[0]);
        setError(null);
      } else {
        setSearchResult(null);
        setError('No device found with the given ICCID');
      }
    } catch (err) {
      console.error(
        'Error searching Jasper device by ICCID in deviceTable:',
        err
      );
      setError('Error searching device by ICCID in deviceTable');
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
        {searchResult && <Button onClick={clearSearch}>Clear</Button>}
      </div>
      <Select onValueChange={handleStateChange} value={selectedState}>
        <SelectTrigger className='w-[180px] mb-4'>
          <SelectValue placeholder='Filter by state' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All State</SelectItem>
          {STATUS.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ICCID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Rate Plan</TableCell>
            <TableCell>Communication Plan</TableCell>
            <TableCell>Providers</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDevices.map((device: JasperDevice) => (
            <TableRow key={device.id}>
              <TableCell>{device.iccid}</TableCell>
              <TableCell>{device.status}</TableCell>
              <TableCell>{device.rate_plan}</TableCell>
              <TableCell>{device.communication_plan}</TableCell>
              <TableCell>{device.providers}</TableCell>
              <TableCell>
                <Button
                  className='bg-indigo-800 text-white hover:bg-indigo-950 mr-2'
                  onClick={() => changeStatus(device.iccid, 'ACTIVATED')}
                  disabled={device.status === 'ACTIVATED'}
                >
                  Activate
                </Button>
                <Button
                  className='bg-rose-600 text-white hover:bg-rose-900'
                  onClick={() => changeStatus(device.iccid, 'DEACTIVATED')}
                  disabled={device.status === 'DEACTIVATED'}
                >
                  Deactivate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
