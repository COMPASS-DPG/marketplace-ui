'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { outfit } from '@/components/FontFamily';

import Spinner from '@/app/components/Spinner';
import { getAllNotifications } from '@/services/marketplaceServices';

type NotificationType = {
  id: number;
  link: string;
  status: string;
  text: string;
  createdAt: string;
};

const Notifications = () => {
  const userId = localStorage.getItem('userId') ?? '';
  const [viewedNotifications, setViewedNotifications] = useState<
    NotificationType[]
  >([]);
  const [unviewedNotifications, setUnviewedNotifications] = useState<
    NotificationType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getAllNotifications(userId);

      const viewed = response.filter(
        (notification: NotificationType) => notification.status === 'VIEWED'
      );
      const unviewed = response.filter(
        (notification: NotificationType) => notification.status !== 'VIEWED'
      );
      setLoading(false);
      setViewedNotifications(viewed);
      setUnviewedNotifications(unviewed);
    } catch (error) {
      toast.error('something went wrong');
      // Handle any errors that occur during the API call
      // eslint-disable-next-line no-console
      console.error('API call error:', error);
      setLoading(false);

      setError(true);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className={`${outfit.className}`}>
      {loading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {error && (
        <div className='mt-[100px] text-center text-[16px] font-medium text-[#272728]'>
          Error...
        </div>
      )}
      {!loading && !error && (
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
