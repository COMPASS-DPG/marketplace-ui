'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { outfit } from '@/components/FontFamily';

const getEmptyValue = () => {
  return [
    {
      id: 1,
      message: 'Course enrollment deadline approaching.',
      date: '2023-11-03',
    },
    {
      id: 2,
      message: 'New achievement unlocked: Web Developer Badge!',
      date: '2023-11-03',
    },
  ];
};

type NotificationType = {
  id: number;
  message: string;
  date: string;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>(
    getEmptyValue()
  );

  const fetchNotifications = () => {
    axios.get('http://localhost:3000/notifications').then((response) => {
      setNotifications(response.data);
    });
  };

  useEffect(() => {
    fetchNotifications();
  });

  return (
    <div className={`${outfit.className}`}>
      <div className='px-5'>
        {/* top heading */}
        <div className='p-1'>
          <p className='text-[16px] font-medium text-[#272728]'>
            {notifications[0].message}
          </p>
          <p className='text-[13px] font-normal text-slate-500 text-opacity-60'>
            Just now
          </p>
        </div>
        {/* bottom heading */}
        <div>
          {notifications.map(({ message, id, date }) => (
            <div key={id} className=''>
              <div className='my-4 h-[1px] w-[320px] bg-slate-200' />
              <p className='text-[16px] font-normal text-[#272728]'>
                {message}
              </p>
              <p className='text-[13px] font-normal text-slate-500 text-opacity-60'>
                {date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
