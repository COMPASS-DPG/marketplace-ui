'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { outfit } from '@/components/FontFamily';

import { getAllNotifications } from '@/services/marketplaceServices';

type NotificationType = {
  id: number;
  link: string;
  status: string;
  text: string;
  date: string;
};

const Notifications = () => {
  const [viewedNotifications, setViewedNotifications] = useState<
    NotificationType[]
  >([]);
  const [unviewedNotifications, setUnviewedNotifications] = useState<
    NotificationType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = '123e4567-e89b-42d3-a456-556642440000';

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getAllNotifications(userId);
      const viewed = response.filter(
        (notification: NotificationType) => notification.status === 'VIEWED'
      );
      const unviewed = response.filter(
        (notification: NotificationType) => notification.status !== 'VIEWED'
      );
      setViewedNotifications(viewed);
      setUnviewedNotifications(unviewed);
      setLoading(false);
    } catch (error) {
      toast.error('something went wrong');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div
        className={`${outfit.className} text-[16px] font-medium text-[#272728]`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className={`${outfit.className}`}>
      <div className='px-5'>
        {/* unviewed  */}
        <div>
          {unviewedNotifications?.length > 0 &&
            unviewedNotifications?.map((notification) => (
              <Link key={notification?.id} href={`${notification?.link}`}>
                <div className=''>
                  <p className='text-[16px] font-medium text-[#272728]'>
                    {notification?.text}
                  </p>
                  <p className='mt-1 text-[13px] font-normal text-slate-500 text-opacity-60'>
                    {notification?.date || 'Sep 3,2023'}
                  </p>
                  <div className='my-4 h-[1px] w-[320px] bg-slate-200' />
                </div>
              </Link>
            ))}
        </div>
        {/* viewed */}
        <div>
          {viewedNotifications.map((notification) => (
            <Link key={notification?.id} href={`${notification?.link}`}>
              <div className=''>
                <p className='text-[16px] font-normal text-[#272728]'>
                  {notification?.text}
                </p>
                <p className='mt-1 text-[13px] font-normal text-slate-500 text-opacity-60'>
                  {notification?.date}
                </p>
                <div className='my-4 h-[1px] w-[320px] bg-slate-200' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
