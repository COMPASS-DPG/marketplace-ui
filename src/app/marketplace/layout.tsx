'use client';
import * as React from 'react';

import Footer from '@/components/navbar/Footer';
import TopNavbar from '@/components/navbar/TopNavbar';
import PullRefresh from '@/components/PullToRefresh';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
    // className='max-w-sm'
    >
      <PullRefresh>
        <>
          <TopNavbar />
          {children}
          <Footer />
        </>
      </PullRefresh>
    </div>
  );
}
