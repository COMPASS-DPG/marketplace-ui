'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

import CourseCard from '@/components/Course/CourseCard';
import TitleNavbar from '@/components/navbar/TitleNavbar';

const getInitialValue = () => {
  return [
    {
      id: 1,
      course_name: 'Introduction to Programming',
      competency: ['Problem Solving', 'Coding Skills'],
      created_by: 'Author 1',
      last_updated_on: '2023-10-31',
      credit_rating: 4,
      language_of_array: ['One', 'Two', 'Three'],
      img: '../../../public/images/courseImage.png',
    },
    {
      id: 2,
      course_name: 'Web Development Basics',
      competency: ['HTML', 'CSS'],
      created_by: 'Author 2',
      last_updated_on: '2023-10-30',
      credit_rating: 3,
      language_of_array: ['One', 'Three'],
      img: '../../../public/images/courseImage.png',
    },
    {
      id: 3,
      course_name: 'Data Science Fundamentals',
      competency: ['Data Analysis', 'Machine Learning'],
      created_by: 'Author 3',
      last_updated_on: '2023-10-29',
      credit_rating: 5,
      language_of_array: ['Two', 'Three'],
      img: '../../../public/images/courseImage.png',
    },
  ];
};

export type CourseType = {
  id: number;
  course_name: string;
  competency: string[];
  created_by: string;
  last_updated_on: string;
  credit_rating: number;
  language_of_array: string[];
  img: string;
};

const Courses = () => {
  const [recommendedCourses, setRecommendedCourses] = useState<CourseType[]>(
    getInitialValue()
  );
  const handlefetch = () => {
    // Define the URLs for the three types of data
    const recommendedUrl = 'http://localhost:3000/recommanded';

    // Fetch the recommended courses using Axios
    axios
      .get(recommendedUrl)
      .then((response) => setRecommendedCourses(response.data));
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <div>
      <TitleNavbar title='Recommended Courses' redirectTo='/marketplace' />
      <div className='flex w-full flex-col items-center gap-5'>
        {recommendedCourses.map((course) => {
          return <CourseCard key={course.id} courseDetails={course} />;
        })}
      </div>
    </div>
  );
};
export default Courses;
