import CourseSlides from '@/components/Course/CourseSlides';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';

import { CourseType } from '@/app/marketplace/page';

const CourseBox = ({
  heading,
  CoursesList,
}: {
  heading: string;
  CoursesList: CourseType[];
}) => {
  return (
    <div>
      <div className='mt-5 flex items-center justify-between px-5 py-4'>
        <Heading heading={heading} />
        <SeeAll heading='See all' />
      </div>
      <div className='flex  gap-2 px-4'>
        <CourseSlides CoursesList={CoursesList} />
      </div>
    </div>
  );
};
export default CourseBox;
