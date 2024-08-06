'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getJasperStatusCounts } from '@/app/api/jasperApi';

interface StatusCounts {
  [key: string]: number;
}

const statusColors: { [key: string]: string } = {
  ACTIVATED: 'bg-green-100',
  DEACTIVATED: 'bg-red-100',
  INVENTORY: 'bg-yellow-100',
  PURGED: 'bg-purple-100',
  REPLACED: 'bg-orange-100',
  RETIRED: 'bg-gray-100',
  TEST_READY: 'bg-blue-100',
};

const Dashboard: React.FC = () => {
  const [counts, setCounts] = useState<StatusCounts>({
    ACTIVATED: 0,
    DEACTIVATED: 0,
    UNKNOWN: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getJasperStatusCounts();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching status counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Jasper Status</h1>
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
    </div>
  );
};

export default Dashboard;
