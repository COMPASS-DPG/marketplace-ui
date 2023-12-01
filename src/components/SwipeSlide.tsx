import { useRouter } from 'next/navigation';

import ButtonFill from '@/components/buttons/ButtonFill';
import { outfit, poppins } from '@/components/FontFamily';

import { CourseType } from '@/redux/marketplace/marketplaceReducer';

const SwipeSlide = ({ course }: { course: CourseType }) => {
  const router = useRouter();
  return (
    <div
      className={`h-[140px] w-[331px] rounded-lg border border-gray-400 border-opacity-20 bg-white px-3 py-2  ${outfit.className} mb-[20px]`}
    >
      <p className='text-[12px] font-bold tracking-[0.12px] text-[#787878]'>
        Ongoing
      </p>
      <p
        className={`text-[15px] font-bold ${poppins.className} my-0.5 tracking-[0.15px] text-[#272728]`}
      >
        {course?.title}
      </p>
      <p
        className={`${outfit.className} text-[13px] font-normal text-neutral-500`}
      >
        {Object.keys(course?.competency ?? {})?.map((key, index) => {
          if (index < 2) {
            return (
              <li key={key}>
                {key} (
                {course.competency[key]
                  .map(
                    (level: string, levelIndex: number) => `L${levelIndex + 1}`
                  )
                  .join(', ')}
                ),{index == 1 && '....'}
              </li>
            );
          }
          return null; // Skip rendering for keys beyond the first two and the ellipsis
        })}
      </p>
      <div className='mt-2 flex justify-between'>
        <p className='text-[#092724]` my-1 text-[14px] font-normal '>
          Created by
          <span className=' text-[#385B8B]` my-1 pl-1 text-[14px] font-bold uppercase '>
            {course?.providerName}
          </span>
        </p>
        <ButtonFill
          onClick={() => {
            router.push(`/${course?.courseLink}`);
          }}
          classes='w-[100px] h-[30px] bg-[#385B8B] text-[#fff]'
        >
          Continue
        </ButtonFill>
      </div>
    </div>
  );
};

export default SwipeSlide;
