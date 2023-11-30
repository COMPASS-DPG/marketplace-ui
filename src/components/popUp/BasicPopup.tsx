import { RxCross1 } from 'react-icons/rx';

import { SingleCourseType } from '@/app/course-description/[id]/page';

const BasicPopup = ({
  setDetailsPopUp,
  courseDetails,
}: {
  setDetailsPopUp: (value: boolean) => void;
  courseDetails: SingleCourseType;
}) => {
  const purchasedDate = new Date(courseDetails?.updatedAt);
  const formattedDate = purchasedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className='fixed inset-0 z-50 flex'>
      <div className='backdrop-blur-{none} absolute  inset-0  bg-black bg-opacity-50'></div>
      {/* pop up height and width and position */}
      <div className='modal-container z-50 mx-auto mt-40 h-[290px] w-[331px] overflow-y-auto rounded-lg bg-white shadow-lg '>
        {/* popUp inside thing */}
        <div className='modal-content flex flex-col justify-between pb-2 pt-4 text-left'>
          <div
            className='mr-5 flex justify-end'
            onClick={() => setDetailsPopUp(false)}
          >
            <RxCross1 size='24' />
          </div>
          <p className=' mx-5 mb-2 text-[22px] font-semibold leading-7 text-[#272728]'>
            {courseDetails?.title}
          </p>

          <p className='px-5 py-2 text-[16px] font-normal uppercase leading-7  text-[#787878] '>
            Created by:{' '}
            <span className='font-medium'>{courseDetails?.providerName}</span>
          </p>
          <p className='px-5  py-2 text-[16px] font-normal leading-7 text-[#787878] '>
            Author: <span className='font-medium'>{courseDetails?.author}</span>
          </p>
          <p className='px-5 py-2  text-[16px] font-normal leading-7 text-[#787878] '>
            Last Updated On:{' '}
            <span className='font-medium'>{formattedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default BasicPopup;
