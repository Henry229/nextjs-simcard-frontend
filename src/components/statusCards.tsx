import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatusCounts {
  [key: string]: number;
}

interface StatusCardsProps {
  counts: StatusCounts;
  title: string;
}

const statusColors: { [key: string]: string } = {
  // Jasper states
  ACTIVATED: 'bg-green-100',
  DEACTIVATED: 'bg-red-100',
  INVENTORY: 'bg-yellow-100',
  PURGED: 'bg-purple-100',
  REPLACED: 'bg-orange-100',
  RETIRED: 'bg-gray-100',
  TEST_READY: 'bg-blue-100',

  // KORE states
  Stock: 'bg-blue-100',
  Active: 'bg-green-100',
  Suspend: 'bg-yellow-100',
  'Suspend With Charge': 'bg-orange-100',
  Deactivated: 'bg-red-100',
  'Pending Scrap': 'bg-purple-100',
  Scrapped: 'bg-gray-100',
  Barred: 'bg-pink-100',
};

const StatusCards: React.FC<StatusCardsProps> = ({ counts, title }) => (
  <>
    <h2 className='text-xl font-semibold mt-6 mb-4'>{title}</h2>
    <div className='grid grid-cols-3 gap-4 mb-6'>
      {Object.entries(counts).map(([status, count]) => (
        <Card
          key={status}
          className={`p-4 ${statusColors[status] || 'bg-gray-100'}`}
        >
          <CardContent>
            <p className='text-sm text-gray-500'>{status} SIMS</p>
            <p className='text-2xl font-bold'>{count}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </>
);

export default StatusCards;
