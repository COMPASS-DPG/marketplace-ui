'use client';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';

import CourseBox from '@/components/Course/CourseBox';
import RelatedCourseCard from '@/components/Course/RelatedCourseCard';
import FilterPage from '@/components/FilterPage';
import Heading from '@/components/heading/Heading';
import SearchInput from '@/components/Input/SearchInput';
import SearchTopbar from '@/components/navbar/SearchTopbar';

import { useMarketPlaceContext } from '@/app/context/MarketPlaceUserContext';
import { SingleCourseType } from '@/app/course-description/[id]/page';
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

export type optionType = {
  competency: { label: string; value: string }[];
  language: { label: string; value: string }[];
  courseProvider: { label: string; value: string }[];
};

const initialFilterOption: optionType = {
  competency: [],
  language: [],
  courseProvider: [],
};
const SearchPage = () => {
  const { mostPopularCourses } = useMarketPlaceContext();
  const [input, setInput] = useState<string>('');
  const [showMostPopularCourses, setShowMostPopularCourses] =
    useState<boolean>(true);

  const [filterCourse, setFilterCourse] = useState<SingleCourseType[]>([]);
  const [filterObj, setFilterObj] = useState<filterObjType>(getInitialValue2());

  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [filterOption, setFilterOption] =
    useState<optionType>(initialFilterOption);

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
      const filteredResponse = response.filter((course: SingleCourseType) => {
        const { competencies, courseProviders, language } = filterObj;

        const competencyMatch =
          competencies.length === 0 ||
          competencies.some(
            (competency) => course.competency[competency]?.length > 0
          );

        const languageMatch =
          language.length === 0 ||
          language.some((lang) => course.language.includes(lang));

        const courseProviderMatch =
          courseProviders.length === 0 ||
          courseProviders.some((provider) => course.providerName === provider);

        return competencyMatch && languageMatch && courseProviderMatch;
      });

      setFilterCourse(filteredResponse);
      setShowMostPopularCourses(false);
    } catch (error) {
      toast.error('something went wrong in filter');
    }
  };

  if (isFilterOpen) {
    return (
      <FilterPage
        filterObj={filterObj}
        setFilterObj={setFilterObj}
        setFilterOpen={setFilterOpen}
        SearchFilterOptions={SearchFilterOptions}
        filterOption={filterOption}
        handleFiterButton={handleFiterButton}
      />
    );
  }
  const handleCrossIcon = () => {
    setShowMostPopularCourses(true);
    setInput('');
  };
  const handleFilterIcon = () => {
    // Extract distinct values for competencies, language, and courseProviders
    const allCompetencies = Array.from(
      new Set(filterCourse.flatMap((course) => Object.keys(course.competency)))
    );

    const allLanguages = Array.from(
      new Set(filterCourse.flatMap((course) => course.language))
    );

    const allCourseProviders = Array.from(
      new Set(filterCourse.map((course) => course.providerName))
    );

    // Create the new filterOption object
    const newFilterOption: optionType = {
      competency: allCompetencies.map((competency) => ({
        label: competency,
        value: competency,
      })),
      language: allLanguages.map((language) => ({
        label: language,
        value: language,
      })),
      courseProvider: allCourseProviders.map((provider) => ({
        label: provider,
        value: provider,
      })),
    };

    setFilterOption(newFilterOption);
    setFilterOpen(true);
  };

  const handleCross = (indexToRemove: number) => {
    const updatedOptions = [...selectedOption];
    updatedOptions.splice(indexToRemove, 1);
    setSelectedOption(updatedOptions);
  };

  return (
    <div className='ml-[16px]'>
      <SearchTopbar title='Search' redirectTo='/marketplace' />
      <SearchInput
        value={input}
        onChange={setInput}
        placeholder='Search your course...'
        handleClick={handleFiterButton}
        selectedOptionCount={selectedOption.length}
        handleCrossIcon={handleCrossIcon}
        handleFilterIcon={handleFilterIcon}
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
                <RxCross1
                  size='12'
                  onClick={() => handleCross(index)}
                  style={{ cursor: 'pointer' }}
                />
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
          handleSeeAllButtonClick='/all-courses?type=popular'
        />
      ) : filterCourse.length != 0 ? (
        <div>
          <div className='mt-5  px-5 py-4'>
            <Heading heading='Related Results' />
          </div>
          <div className='flex flex-col gap-5 px-4'>
            {filterCourse.map((course: SingleCourseType, index: number) => {
              return <RelatedCourseCard key={index} courseDetails={course} />;
            })}
          </div>
        </div>
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
