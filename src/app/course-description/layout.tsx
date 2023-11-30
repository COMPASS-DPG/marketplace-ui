'use client';
import * as React from 'react';

import PullRefresh from '@/components/PullToRefresh';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PullRefresh>
        <>{children}</>
      </PullRefresh>
    </div>
  );
}
