'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { getMarketplaceCourses } from '@/redux/marketplace/action';
import { MARKETPLACE_SUCCESS } from '@/redux/marketplace/type';
import { AppDispatch } from '@/redux/store';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const userId = localStorage.getItem('userId') ?? '';
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMarketplaceCourses(userId)).then((res: unknown) => {
      if ((res as { type?: string })?.type === MARKETPLACE_SUCCESS) {
        router.push('/marketplace');
      }
    });
  }, [dispatch, userId, router]);
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='flex h-screen flex-col items-center justify-center'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-blue-500'></div>
          <p className='mt-4 text-lg font-semibold text-gray-600'>
            Loading MarketPlace...
          </p>
        </div>
      </section>
    </main>
  );
}
