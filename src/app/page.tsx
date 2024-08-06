// 'use client';

// pages/sim-management.tsx
// import React, { useState } from 'react';
// import { Layout } from '@/components/Layout';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';

// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from '@/components/ui/command';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import Combobox from '@/components/comboBox';
import { redirect } from 'next/navigation';

// const providers = [
//   { value: 'jasper', label: 'Jasper' },
//   { value: 'kore', label: 'KORE' },
//   { value: 'all', label: 'ALL' },
// ];

// const states = [
//   { value: 'active', label: 'Active' },
//   { value: 'inactive', label: 'Inactive' },
//   { value: 'all', label: 'ALL' },
// ];

// const simData = [
//   {
//     id: '#214314',
//     customer: 'Customer Name',
//     deviceIMEI: '123654619532',
//     simID: '546546546546464',
//     phoneNo: '+61545646651',
//     deviceID: '123456',
//     provider: 'KORE',
//     created: '11/11/2024',
//     state: 'Active',
//   },
//   {
//     id: '#214315',
//     customer: 'Customer Name',
//     deviceIMEI: '123654619532',
//     simID: '546546546546464',
//     phoneNo: '+61545646651',
//     deviceID: '123456',
//     provider: 'KORE',
//     created: '11/11/2024',
//     state: 'Inactive',
//   },
//   {
//     id: '#214316',
//     customer: 'Customer Name',
//     deviceIMEI: '123654619532',
//     simID: '546546546546464',
//     phoneNo: '+61545646651',
//     deviceID: '123456',
//     provider: 'TELSTRA',
//     created: '11/11/2024',
//     state: 'Inactive',
//   },
//   {
//     id: '#214317',
//     customer: 'Customer Name',
//     deviceIMEI: '123654619532',
//     simID: '546546546546464',
//     phoneNo: '+61545646651',
//     deviceID: '123456',
//     provider: 'TELSTRA',
//     created: '11/11/2024',
//     state: 'Inactive',
//   },
// ];

export default function HomePage() {
  redirect('/dashboard');
  // return (
  //   <div className='p-6'>
  //     <h1 className='text-2xl font-bold mb-6'>List</h1>
  //     <div className='grid grid-cols-3 gap-4 mb-6'>
  //       <Card className='p-4 bg-green-100'>
  //         <p className='text-sm text-gray-500'>Active SIMS</p>
  //         <p className='text-2xl font-bold'>3560</p>
  //       </Card>
  //       <Card className='p-4 bg-red-100'>
  //         <p className='text-sm text-gray-500'>Inactive SIMS</p>
  //         <p className='text-2xl font-bold'>420</p>
  //       </Card>
  //       <Card className='p-4 bg-blue-100'>
  //         <p className='text-sm text-gray-500'>Unknown</p>
  //         <p className='text-2xl font-bold'>1231</p>
  //       </Card>
  //     </div>
  //     <div className='flex gap-4 mb-6'>
  //       <Combobox items={providers} placeholder='Provider' />
  //       <Combobox items={states} placeholder='State' />
  //       <Input className='flex-grow' type='search' placeholder='Search' />
  //     </div>
  //     <div className='flex justify-between items-center mb-4'>
  //       <h2 className='text-xl font-semibold'>Manage SIM Cards</h2>
  //       <Button>Bulk Actions</Button>
  //     </div>
  //     <Table>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead>Record ID</TableHead>
  //           <TableHead>Customer</TableHead>
  //           <TableHead>Device IMEI</TableHead>
  //           <TableHead>SIM ID</TableHead>
  //           <TableHead>Phone No</TableHead>
  //           <TableHead>Device ID</TableHead>
  //           <TableHead>Provider</TableHead>
  //           <TableHead>Created</TableHead>
  //           <TableHead>State</TableHead>
  //           <TableHead>Action</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       <TableBody>
  //         {simData.map((sim) => (
  //           <TableRow key={sim.id}>
  //             <TableCell>{sim.id}</TableCell>
  //             <TableCell>{sim.customer}</TableCell>
  //             <TableCell>{sim.deviceIMEI}</TableCell>
  //             <TableCell>{sim.simID}</TableCell>
  //             <TableCell>{sim.phoneNo}</TableCell>
  //             <TableCell>{sim.deviceID}</TableCell>
  //             <TableCell>{sim.provider}</TableCell>
  //             <TableCell>{sim.created}</TableCell>
  //             <TableCell>
  //               <Badge
  //                 variant={sim.state === 'Active' ? 'default' : 'secondary'}
  //               >
  //                 {sim.state}
  //               </Badge>
  //             </TableCell>
  //             <TableCell>
  //               <Button variant='ghost'>Details</Button>
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
}
