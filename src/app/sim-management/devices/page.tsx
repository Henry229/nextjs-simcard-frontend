import DevicesTable from '@/components/deviceTable';

export default function DevicesPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Devices</h1>
      <DevicesTable />
    </div>
  );
}
