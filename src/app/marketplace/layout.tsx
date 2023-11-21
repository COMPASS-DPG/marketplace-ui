'use client';
import * as React from 'react';

import TopNavbar from '@/components/navbar/TopNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-sm'>
      <TopNavbar />
      {children}
    </div>
  );
}
