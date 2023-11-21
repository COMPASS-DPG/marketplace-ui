'use client';
import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='max-w-sm'>{children}</div>;
}
