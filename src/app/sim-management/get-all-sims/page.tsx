import GetAllSimsClient from '@/components/getAllSImsClient';

export default function GetAllSimsPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>All SIM Cards</h1>
      <GetAllSimsClient />
    </div>
  );
}
