import React from 'react';

import EmptyBox from '~/svg/emptyBox.svg';

const NoCoursesFound = () => {
  return (
    <div className='mx-7'>
      <div className='flex justify-center'>
        <EmptyBox width='160px' />
      </div>
      <p className='font-outfit text-center text-base font-medium text-[#272728]'>
        No courses found.
      </p>
    </div>
  );
};

export default NoCoursesFound;
