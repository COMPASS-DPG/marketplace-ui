'use client';
import * as React from 'react';

import TitleNavbar from '@/components/navbar/TitleNavbar';
import PullRefresh from '@/components/PullToRefresh';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PullRefresh>
        <>
          <TitleNavbar title='Completed Course' />
          {children}
        </>
      </PullRefresh>
    </div>
  );
}
