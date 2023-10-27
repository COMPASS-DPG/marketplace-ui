'use client';
import * as React from 'react';

import SearchTopbar from '@/components/navbar/SearchTopbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-screen'>
      <SearchTopbar title='Search' />
      {children}
    </div>
  );
}
