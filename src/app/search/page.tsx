'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

import CourseSlides from '@/components/Course/CourseSlides';
import FilterPage from '@/components/FilterPage';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';
import SearchInput from '@/components/Input/SearchInput';
import SearchTopbar from '@/components/navbar/SearchTopbar';

import { getInitialValue } from '@/app/marketplace/page';

import { NotFound } from '~/svg';

const getInitialValue2 = () => {
  return {
    competencies: [],
    courseProviders: [],
    language: [],
    sortBy: '',
    duration: '',
  };
};

export type filterObjType = {
  competencies: string[];
  courseProviders: string[];
  language: string[];
  sortBy: string;
  duration: string;
};

const SearchPage = () => {
  const [input, setInput] = useState<string>('');
  const [filterObj, setFilterObj] = useState<filterObjType>(getInitialValue2());
  const [mostPoplularCourses, setMostPoplularCourses] = useState(
    getInitialValue()
  );
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  // handle filter button
  const SearchFilterOptions = () => {
    const { competencies, courseProviders, language, sortBy, duration } =
      filterObj;
    setSelectedOption([]);
    if (competencies.length)
      setSelectedOption((prev) => [
        ...prev,
        `${competencies.length} competencies`,
      ]);
    if (courseProviders.length)
      setSelectedOption((prev) => [
        ...prev,
        `${courseProviders.length} course provider`,
      ]);
    if (language.length)
      setSelectedOption((prev) => [...prev, `${language.length} language`]);
    if (sortBy) {
      setSelectedOption((prev) => [...prev, sortBy]);
    }
    if (duration) {
      setSelectedOption((prev) => [...prev, duration]);
    }
  };

  // open filter page
  const handleFiterButton = () => {
    setFilterOpen(true);
  };
  useEffect(() => {
    // fetch the most popular course
    setMostPoplularCourses([]);
  }, []);

  if (isFilterOpen) {
    return (
      <FilterPage
        filterObj={filterObj}
        setFilterObj={setFilterObj}
        setFilterOpen={setFilterOpen}
        SearchFilterOptions={SearchFilterOptions}
      />
    );
  }

  return (
    <div className='ml-[16px]'>
      <Link href='/marketplace'>
        <SearchTopbar title='Search' />
      </Link>
      <SearchInput
        value={input}
        onChange={setInput}
        placeholder='Search your course...'
        handleClick={handleFiterButton}
        selectedOptionCount={selectedOption.length}
      />
      {selectedOption.length != 0 && (
        <div className='my-5 flex flex-wrap items-center gap-2'>
          <p className='text-[14px] font-medium leading-6 '>Filtered by:</p>
          {selectedOption.map((option, index) => {
            return (
              <div
                key={index}
                className='inline-flex items-center justify-center gap-2 rounded-full bg-[#F4F8FF] px-2 py-1'
              >
                <p>{option}</p>
                <RxCross1 size='12' />
              </div>
            );
          })}
        </div>
      )}

      {/* either */}
      <div>
        <div className='mb-2 mt-7  flex items-center justify-between pb-4 pr-5'>
          <Heading heading='Most Popular Courses' />
          <SeeAll heading='See all' />
        </div>
        <div className='flex  gap-2'>
          <CourseSlides CoursesArray={mostPoplularCourses} />
        </div>
      </div>
      {/* Or */}
      <div>
        <div className='mt-5 flex items-center justify-between  py-4 pr-5'>
          <Heading heading='Related Results' />
        </div>
        <div className='flex  gap-2'>{/* <CouseCard /> */}</div>
      </div>
      {/* nothing is present */}
      <div className='py-10'>
        <div className='flex justify-center'>
          <NotFound width='200px' height='162px' />
        </div>
        <div className='mx-5 text-center'>
          <p className='#272728 text-xl font-semibold text-[#272728]'>
            Search not found
          </p>
          <p className='#65758C text-sm font-normal text-[#272728]'>
            Please activate the property name search service that is available
            correctly
          </p>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
