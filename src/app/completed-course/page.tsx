import SingleCompletedCourse from '@/components/Course/SingleCompletedCourse';
import { outfit } from '@/components/FontFamily';

export type completeCourseType = {
  courseId: number;
  name: string;
  author: string;
  rated: boolean;
  imageUrl: string;
  start: number;
};

const CompleteCourselist = [
  {
    courseId: 1,
    name: 'node js top course',
    author: 'you can do it',
    rated: true,
    imageUrl: '/url',
    start: 0,
  },
  {
    courseId: 2,
    name: 'react fundamentals',
    author: 'coding master',
    rated: false,
    imageUrl: '/url2',
    start: 4,
  },
  {
    courseId: 3,
    name: 'full-stack web development',
    author: 'web wizard',
    rated: true,
    imageUrl: '/url3',
    start: 5,
  },
  {
    courseId: 4,
    name: 'JavaScript advanced techniques',
    author: 'code guru',
    rated: false,
    imageUrl: '/url4',
    start: 2,
  },
];

const CompletedCourse = () => {
  return (
    <div
      className={`px-[20px] ${outfit.className} flex flex-col gap-2 bg-[#fff]`}
    >
      {CompleteCourselist?.map((course: completeCourseType, index) => (
        <SingleCompletedCourse key={index} courseDetail={course} />
      ))}
    </div>
  );
};
export default CompletedCourse;
