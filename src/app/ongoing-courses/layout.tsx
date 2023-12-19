'use client';
import * as React from 'react';

import TitleNavbar from '@/components/navbar/TitleNavbar';
import PullRefresh from '@/components/PullToRefresh';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PullRefresh>
      <>
        {' '}
        <TitleNavbar title='Continue Your Course' />
        {children}
      </>
    </PullRefresh>
  );
}
