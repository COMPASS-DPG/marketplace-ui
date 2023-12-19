import { outfit, poppins } from '@/components/FontFamily';

import { OnGoingCoursesType } from '@/app/ongoing-courses/page';

const SwipeSlide = ({ course }: { course: OnGoingCoursesType }) => {
  return (
    <div
      className={`p- cursor-pointer rounded-lg border border-gray-400 border-opacity-20 bg-white px-3 ${outfit.className} mb-[30px]`}
    >
      <p className='text-[12px] font-bold tracking-[0.12px] text-[#787878]'>
        Ongoing
      </p>
      <p
        className={`text-[15px] font-bold ${poppins.className} my-0.5 tracking-[0.15px] text-[#272728]`}
      >
        {course?.CourseInfo?.title}
      </p>
      <p
        className={`${outfit.className} h-[50px] text-[13px] font-normal text-neutral-500`}
      >
        {course?.CourseInfo?.competency?.length > 0 &&
          course?.CourseInfo?.competency?.map((item, index) => {
            if (index < 2) {
              return (
                <li key={item?.id}>
                  {item?.name} (
                  {item?.levels
                    .map((level) => `L${level?.levelNumber}`)
                    .join(', ')}
                  ),{index == 1 && '....'}
                </li>
              );
            }
            return null; // Skip rendering for keys beyond the first two and the ellipsis
          })}
      </p>
      <div className='mb-2 mt-2 flex justify-between'>
        <p className='text-[#092724]` text-[14px] font-normal '>
          Created by
          <span className='pl-1 font-bold  uppercase text-[#385B8B]'>
            {course?.CourseInfo?.providerName}
          </span>
        </p>
        <a
          href={course?.CourseInfo?.courseLink}
          target='_blank'
          className='rounded-md bg-[#385B8B] px-4 py-1 font-medium text-[#fff]'
        >
          Continue
        </a>
      </div>
    </div>
  );
};

export default SwipeSlide;
