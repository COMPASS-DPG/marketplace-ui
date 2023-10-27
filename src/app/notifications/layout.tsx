'use client';
import * as React from 'react';

import TitleNavbar from '@/components/navbar/TitleNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TitleNavbar title='Notifications' />
      {children}
    </div>
  );
}
