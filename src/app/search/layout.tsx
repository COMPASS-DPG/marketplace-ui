'use client';
import Link from 'next/link';
import * as React from 'react';

import SearchTopbar from '@/components/navbar/SearchTopbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-screen'>
      <Link href='/marketplace'>
        <SearchTopbar title='Search' />
      </Link>
      {children}
    </div>
  );
}
