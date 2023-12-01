'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { outfit } from '@/components/FontFamily';

import Spinner from '@/app/components/Spinner';
import { getAllNotifications } from '@/redux/notification/action';
import { AppDispatch, RootState } from '@/redux/store';

export type NotificationType = {
  id: number;
  link: string;
  status: string;
  text: string;
  createdAt: string;
};

const Notifications = () => {
  const userId = localStorage.getItem('userId') ?? '';
  const dispatch: AppDispatch = useDispatch();
  const {
    notificationData,
    isLoading,
    isError,
  }: {
    notificationData: NotificationType[];
    isLoading: boolean;
    isError: boolean;
  } = useSelector((state: RootState) => state.notification);

  const viewedNotifications: NotificationType[] = notificationData?.filter(
    (notification: NotificationType) => notification.status === 'VIEWED'
  );
  const unviewedNotifications: NotificationType[] = notificationData?.filter(
    (notification: NotificationType) => notification.status !== 'VIEWED'
  );

  useEffect(() => {
    dispatch(getAllNotifications(userId));
  }, [dispatch, userId]);

  return (
    <div className={`${outfit.className}`}>
      {isLoading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {isError && (
        <div className='mt-[100px] text-center text-[16px] font-medium text-[#272728]'>
          Error...
        </div>
      )}
      {!isLoading && !isError && (
        <div className='px-5'>
          {/* unviewed  */}
          {unviewedNotifications?.length > 0 &&
            unviewedNotifications?.map((notification) => {
              const createdAtDate = new Date(notification?.createdAt);

              const formattedDate = new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format(createdAtDate);

              return (
                <div key={notification?.id} className=''>
                  <p className='text-[16px] font-medium text-[#272728]'>
                    {notification?.text}
                  </p>
                  <p className='mt-1 text-[13px] font-normal text-slate-500 text-opacity-60'>
                    {formattedDate}
                  </p>
                  <div className='my-4 h-[1px] w-[320px] bg-slate-200' />
                </div>
              );
            })}

          {/* viewed */}
          {viewedNotifications.map((notification) => {
            const createdAtDate = new Date(notification?.createdAt);

            const formattedDate = new Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(createdAtDate);

            return (
              <div key={notification?.id} className=''>
                <p className='text-[16px] font-normal text-[#272728]'>
                  {notification?.text}
                </p>
                <p className='mt-1 text-[13px] font-normal text-slate-500 text-opacity-60'>
                  {formattedDate}
                </p>
                <div className='my-4 h-[1px] w-[320px] bg-slate-200' />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
