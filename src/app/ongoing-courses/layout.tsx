'use client';
import * as React from 'react';

import TitleNavbar from '@/components/navbar/TitleNavbar';
import PullRefresh from '@/components/PullToRefresh';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-sm'>
      <PullRefresh>
        <>
          {' '}
          <TitleNavbar title='Continue Your Course' />
          {children}
        </>
      </PullRefresh>
    </div>
  );
}
