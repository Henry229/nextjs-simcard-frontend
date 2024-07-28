'use client';

import React from 'react';
import { useSimContext } from '../app/contexts/simContext';

const GetAllSimsClient: React.FC = () => {
  const { sims } = useSimContext();
  console.log('**** sims:', sims[0]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>All SIMs</h1>
      {sims.length === 0 ? (
        <p>No SIMs found.</p>
      ) : (
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='px-4 py-2'>ICCID</th>
              <th className='px-4 py-2'>Status</th>
              {/* 필요한 다른 열 추가 */}
            </tr>
          </thead>
          <tbody>
            {sims.map((sim) => (
              <tr key={sim.iccid}>
                <td className='border px-4 py-2'>{sim.iccid}</td>
                <td className='border px-4 py-2'>
                  {'jasper_status' in sim ? sim.jasper_status : 'N/A'}
                </td>
                {/* 필요한 다른 데이터 추가 */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllSimsClient;
