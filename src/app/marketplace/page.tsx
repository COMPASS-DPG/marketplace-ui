'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'swiper/css';

import CourseSlides from '@/components/Course/CourseSlides';
import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';
import SearchInput from '@/components/Input/SearchInput';
import Footer from '@/components/navbar/Footer';
import SwiperDiv from '@/components/SwiperDiv';

export const getInitialValue = () => {
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

const MarketPlace = () => {
  const router = useRouter();

  const [input, setInput] = useState<string>('');
  const [recommendedCourses, setRecommendedCourses] = useState<CourseType[]>(
    getInitialValue()
  );
  const [mostPoplularCourses, setmostPoplularCourses] = useState<CourseType[]>(
    getInitialValue()
  );
  const [savedCourses, setSavedCourses] = useState<CourseType[]>(
    getInitialValue()
  );

  const handleSearch = () => {
    // Define the URLs for the three types of data
    const recommendedUrl = 'http://localhost:3000/recommanded';
    const popularUrl = 'http://localhost:3000/popular';
    const savedUrl = 'http://localhost:3000/saved';

    // Fetch the recommended courses using Axios
    axios
      .get(recommendedUrl)
      .then((response) => setRecommendedCourses(response.data));

    // Fetch the most popular courses using Axios
    axios
      .get(popularUrl)
      .then((response) => setmostPoplularCourses(response.data));

    // Fetch the saved courses using Axios
    axios.get(savedUrl).then((response) => setSavedCourses(response.data));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleClick = (value: string) => {
    router.push(value);
  };

  return (
    <div>
      <div className='px-5 pb-4 pt-4 '>
        <Heading heading='Hi Akshay Anand 👋' />
        <p
          className={`mb-1 text-base font-normal text-[#272728]	 ${outfit.className}`}
        >
          Let’s Improve Your{' '}
          <span className='font-semibold text-[#385B8B]'>Competency!</span>
        </p>
        {/* serach bar */}
        <div
          className='rounded-3xl pb-7 pt-4 '
          onClick={() => handleClick('/search')}
        >
          <SearchInput
            value={input}
            onChange={setInput}
            placeholder='Search your course...'
          />
        </div>
        <div className='flex items-center justify-between'>
          <Heading heading='Continue Your Course' />
          <SeeAll heading='See all' />
        </div>
        <div className='mt-5'>
          <SwiperDiv />
        </div>
      </div>
      {/* Recommended course */}
      <div>
        <div className='mt-5 flex items-center justify-between px-5 py-4'>
          <Heading heading='Recommended Courses' />
          <div onClick={() => handleClick('/recommended-courses')}>
            <SeeAll heading='See all' />
          </div>
        </div>
        <div className='flex  gap-2 px-4'>
          <CourseSlides CoursesArray={recommendedCourses} />
        </div>
      </div>
      {/* most popular course */}
      <div>
        <div className='mt-5 flex items-center justify-between px-5 py-4'>
          <Heading heading='Most Popular Courses' />
          <SeeAll heading='See all' />
        </div>
        <div className='flex  gap-2 px-4'>
          <CourseSlides CoursesArray={mostPoplularCourses} />
        </div>
      </div>
      {/* saved course */}
      <div>
        <div className='mt-5 flex items-center justify-between px-5 py-4'>
          <Heading heading='Saved Courses' />
          <SeeAll heading='See all' />
        </div>
        <div className='flex gap-4 px-4'>
          <CourseSlides CoursesArray={savedCourses} />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};
export default MarketPlace;
