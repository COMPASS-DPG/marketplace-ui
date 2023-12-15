'use client';

import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { getMarketplaceCourses } from '@/redux/marketplace/action';
import { MARKETPLACE_SUCCESS } from '@/redux/marketplace/type';
import { AppDispatch } from '@/redux/store';
import { getUserDetails } from '@/redux/userDetails/action';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    let userId = localStorage.getItem('userId') || '';
    const queryId = searchParams.get('userId') || '';
    if (queryId.trim() !== '') {
      userId = queryId;
      localStorage.setItem('userId', queryId);
    }
    dispatch(getUserDetails(userId));
    dispatch(getMarketplaceCourses(userId)).then((res: unknown) => {
      if ((res as { type?: string })?.type === MARKETPLACE_SUCCESS) {
        router.push('/marketplace');
      }
    });
  }, [dispatch, searchParams, router]);
  return (
    <main>
      <Head>
        <title>Compass Marketplace demo</title>
        <meta
          name='description'
          content='This is a custom description for my example page.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link
          rel='icon'
          href='https://media.licdn.com/dms/image/C510BAQFjhkWMy7bt4A/company-logo_200_200/0/1631433[…]47483647&v=beta&t=jyeO-x9Izv6irA2_ecnOIgeeKqswSEDmIfvqTMugRGk'
        />
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
