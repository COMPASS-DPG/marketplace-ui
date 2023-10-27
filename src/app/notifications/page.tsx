import { outfit } from '@/components/FontFamily';

const Notifications = () => {
  return (
    <div className={`${outfit.className}`}>
      <div className='px-5'>
        {/* top heading */}
        <div className='p-1'>
          <p className='text-[16px] font-medium text-[#272728]'>
            Hey! Please review your completed course.
          </p>
          <p className='text-[13px] font-normal text-slate-500 text-opacity-60'>
            Just now
          </p>
        </div>
        {/* bottom heading */}
        <div>
          {['', '', '', '', '', ''].map((item, index) => (
            <div key={index} className=''>
              <div className='my-4 h-[1px] w-[320px] bg-slate-200' />
              <p className='text-[16px] font-normal text-[#272728]'>
                Hey Akshay Anand You have 04 number of courses yet to be
                completed.
              </p>
              <p className='text-[13px] font-normal text-slate-500 text-opacity-60'>
                Sep 3, 2023
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
