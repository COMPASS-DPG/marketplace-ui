'use client';
import * as React from 'react';

import TitleNavbar from '@/components/navbar/TitleNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-[374px]	'>
      <TitleNavbar title='Notifications' redirectTo='/marketplace' />
      {children}
    </div>
  );
}
