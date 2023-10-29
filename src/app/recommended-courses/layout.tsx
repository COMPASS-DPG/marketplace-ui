'use client';
import Link from 'next/link';
import * as React from 'react';

import TitleNavbar from '@/components/navbar/TitleNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-screen'>
      <Link href='/marketplace'>
        <TitleNavbar title='Recommended Courses' />
      </Link>
      {children}
    </div>
  );
}
