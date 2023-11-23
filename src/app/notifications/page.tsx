'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { outfit } from '@/components/FontFamily';

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
  const consumerId = '123e4567-e89b-42d3-a456-556642440000';

  const fetchNotifications = async () => {
    const url = `http://localhost:4000/api/consumer/${consumerId}/notifications`;

    const response = await axios.get(url);
    const data = response?.data?.data?.notifications || [];
    const viewed = data.filter(
      (notification: NotificationType) => notification.status === 'VIEWED'
    );
    const unviewed = data.filter(
      (notification: NotificationType) => notification.status !== 'VIEWED'
    );
    setViewedNotifications(viewed);
    setUnviewedNotifications(unviewed);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div className={`${outfit.className}`}>
      <div className='px-5'>
        {/* unviewed  */}
        <div>
          {unviewedNotifications?.length > 0 &&
            unviewedNotifications?.map((notification) => (
              <Link key={notification?.id} href={`${notification?.link}`}>
                <div key={notification?.id} className=''>
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
