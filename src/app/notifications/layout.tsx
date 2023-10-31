'use client';
import Link from 'next/link';
import * as React from 'react';

import TitleNavbar from '@/components/navbar/TitleNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-[374px]	'>
      <Link href='marketplace'>
        <TitleNavbar title='Notifications' />
      </Link>
      {children}
    </div>
  );
}
