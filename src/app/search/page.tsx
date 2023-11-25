'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';

import CourseBox from '@/components/Course/CourseBox';
import FilterPage from '@/components/FilterPage';
import SearchInput from '@/components/Input/SearchInput';
import SearchTopbar from '@/components/navbar/SearchTopbar';

import {
  CourseType,
  useMarketPlaceContext,
} from '@/app/context/MarketPlaceUserContext';
import { getFilterCourse } from '@/services/marketplaceServices';

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
  const { mostPopularCourses } = useMarketPlaceContext();
  const [filterCourse, setFilterCourse] = useState<CourseType[]>([]);
  const [input, setInput] = useState<string>('');
  const [filterObj, setFilterObj] = useState<filterObjType>(getInitialValue2());
  const [showMostPopularCourses, setShowMostPopularCourses] =
    useState<boolean>(true);
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
  const handleFiterButton = async () => {
    try {
      const response = await getFilterCourse(input);
      setFilterCourse(response);
      setShowMostPopularCourses(false);
    } catch (error) {
      toast.error('something went wrong in filter');
    }
  };
  useEffect(() => {
    // fetch the most popular course
    // setMostPopularCourses([]);
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
      {showMostPopularCourses ? (
        <CourseBox
          heading='Most Popular Courses'
          CoursesList={mostPopularCourses}
        />
      ) : filterCourse.length != 0 ? (
        <CourseBox heading='Related Results' CoursesList={filterCourse} />
      ) : (
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
      )}
    </div>
  );
};
export default SearchPage;
