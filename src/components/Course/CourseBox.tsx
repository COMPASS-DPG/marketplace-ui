import CourseSlides from '@/components/Course/CourseSlides';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';

import { CourseType } from '@/redux/marketplace/marketplaceReducer';

const CourseBox = ({
  heading,
  CoursesList,
  handleSeeAllButtonClick,
}: {
  heading: string;
  CoursesList: CourseType[];
  handleSeeAllButtonClick: string;
}) => {
  return (
    <div>
      <div className='mt-5 flex items-center justify-between px-5 py-4'>
        <Heading heading={heading} />
        <SeeAll heading='See all' redirectTo={handleSeeAllButtonClick} />
      </div>
      <div className='flex  gap-2 px-4'>
        <CourseSlides CoursesList={CoursesList} />
      </div>
    </div>
  );
};
export default CourseBox;
