'use client';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CourseBox from '@/components/Course/CourseBox';
import CourseCard from '@/components/Course/CourseCard';
import FilterPage from '@/components/FilterPage';
import Heading from '@/components/heading/Heading';
import SearchInput from '@/components/Input/SearchInput';
import SearchTopbar from '@/components/navbar/SearchTopbar';

import { CourseType } from '@/redux/marketplace/marketplaceReducer';
import { getSearchCourses } from '@/redux/searchCourses/action';
import { AppDispatch, RootState } from '@/redux/store';

import { NotFound } from '~/svg';

// const testData = [
//   {
//     courseId: "1",
//     title: "NestJS Complete",
//     description: "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!",
//     providerId: "123e4567-e89b-42d3-a456-556642440011",
//     providerName: "Udemy",
//     credits: "10",
//     language: [
//       "en"
//     ],
//     competency: {
//       Typescript: [
//         "Level1"
//       ],
//       APIDevelopment: [
//         "Level1",
//         "Level2"
//       ],
//       BackendEngineering: [
//         "Level1"
//       ]
//     },
//     imageLink: "https://courses.nestjs.com/img/logo.svg",
//     avgRating: "0",
//     startTime: "2023-12-05T06:25:41.270Z",
//     endTime: "2023-12-05T06:25:41.270Z",
//     numberOfPurchases: 1
//   },
//   {
//     courseId: "2",
//     title: "JAVA Complete",
//     description: "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!",
//     providerId: "123e4567-e89b-42d3-a456-556642440011",
//     providerName: "Code",
//     credits: "4",
//     language: [
//       "marathi"
//     ],
//     competency: {
//       competency1: [
//         "Level1"
//       ],
//       competency2: [
//         "Level1",
//         "Level2"
//       ],
//       competency3: [
//         "Level1"
//       ]
//     },
//     imageLink: "https://courses.nestjs.com/img/logo.svg",
//     avgRating: "0",
//     startTime: "2023-12-05T06:25:41.270Z",
//     endTime: "2023-12-05T06:25:41.270Z",
//     numberOfPurchases: 1
//   },
//   {
//     courseId: "3",
//     title: "C++ Complete",
//     description: "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!",
//     providerId: "123e4567-e89b-42d3-a456-556642440011",
//     providerName: "my code",
//     credits: "8",
//     language: [
//       "hindi"
//     ],
//     competency: {
//       competency4: [
//         "Level1"
//       ],
//       competency5: [
//         "Level1",
//         "Level2"
//       ],
//       competency6: [
//         "Level1"
//       ]
//     },
//     imageLink: "https://courses.nestjs.com/img/logo.svg",
//     avgRating: "0",
//     startTime: "2023-12-05T06:25:41.270Z",
//     endTime: "2023-12-05T06:25:41.270Z",
//     numberOfPurchases: 1
//   },
//   {
//     courseId: "5",
//     title: "Mongodb Complete",
//     description: "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!",
//     providerId: "123e4567-e89b-42d3-a456-556642440011",
//     providerName: "my code",
//     credits: "4",
//     language: [
//       "hindi"
//     ],
//     competency: {
//       competency4: [
//         "Level1"
//       ],
//       competency5: [
//         "Level1",
//         "Level2"
//       ],
//       competency6: [
//         "Level1"
//       ]
//     },
//     imageLink: "https://courses.nestjs.com/img/logo.svg",
//     avgRating: "0",
//     startTime: "2023-12-05T06:25:41.270Z",
//     endTime: "2023-12-05T06:25:41.270Z",
//     numberOfPurchases: 1
//   },
//   {
//     courseId: "5",
//     title: "Python Complete",
//     description: "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!",
//     providerId: "123e4567-e89b-42d3-a456-556642440011",
//     providerName: "my code",
//     credits: "1",
//     language: [
//       "hindi"
//     ],
//     competency: {
//       competency1: [
//         "Level1"
//       ],
//       competency3: [
//         "Level1",
//         "Level2"
//       ],
//       competency6: [
//         "Level1"
//       ]
//     },
//     imageLink: "https://courses.nestjs.com/img/logo.svg",
//     avgRating: "0",
//     startTime: "2023-12-05T06:25:41.270Z",
//     endTime: "2023-12-05T06:25:41.270Z",
//     numberOfPurchases: 1
//   },
//   {
//     courseId: "6",
//     title: "Next Complete",
//     description: "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!",
//     providerId: "123e4567-e89b-42d3-a456-556642440011",
//     providerName: "my code",
//     credits: "2",
//     language: [
//       "hindi"
//     ],
//     competency: {
//       competency2: [
//         "Level1"
//       ],
//       competency1: [
//         "Level1",
//         "Level2"
//       ],
//       competency6: [
//         "Level1"
//       ]
//     },
//     imageLink: "https://courses.nestjs.com/img/logo.svg",
//     avgRating: "0",
//     startTime: "2023-12-05T06:25:41.270Z",
//     endTime: "2023-12-05T06:25:41.270Z",
//     numberOfPurchases: 1
//   },
//   {
//     courseId: "7",
//     title: "C Complete",
//     description: "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!",
//     providerId: "123e4567-e89b-42d3-a456-556642440011",
//     providerName: "my code",
//     credits: "4",
//     language: [
//       "hindi"
//     ],
//     competency: {
//       competency3: [
//         "Level1"
//       ],
//       competency5: [
//         "Level1",
//         "Level2"
//       ],
//       competency6: [
//         "Level1"
//       ]
//     },
//     imageLink: "https://courses.nestjs.com/img/logo.svg",
//     avgRating: "0",
//     startTime: "2023-12-05T06:25:41.270Z",
//     endTime: "2023-12-05T06:25:41.270Z",
//     numberOfPurchases: 1
//   }
// ]

const getInitialValue2 = () => {
  return {
    competencies: '',
    courseProviders: null,
    language: null,
    sortBy: '',
  };
};

export type filterObjType = {
  competencies: string;
  courseProviders: string[] | null;
  language: string[] | null;
  sortBy: string;
};

export type optionType = {
  competency: { label: string; value: string }[];
  language: { label: string; value: string }[];
  courseProvider: { label: string; value: string }[];
};

// will filter data
const filterData = (data: CourseType[], filterObj: filterObjType) => {
  // if there is no filter applied
  if (
    Object.values(filterObj)?.every(
      (element) => element === null || element === ''
    )
  ) {
    return data;
  }
  const { competencies, courseProviders, language, sortBy } = filterObj;

  let filteredResponse = data?.filter((course: CourseType) => {
    const competencyMatch =
      !competencies || course?.competency[competencies]?.length > 0;

    const languageMatch =
      language?.length === 0 ||
      !language ||
      language?.some((lang: string) => course?.language.includes(lang));

    const courseProviderMatch =
      courseProviders?.length === 0 ||
      !courseProviders ||
      courseProviders?.some(
        (provider: string) => course?.providerName === provider
      );

    return competencyMatch && languageMatch && courseProviderMatch;
  });
  if (sortBy === 'Low Price') {
    filteredResponse = filteredResponse.sort((a, b) => a.credits - b.credits);
  }
  if (sortBy === 'High Price') {
    filteredResponse = filteredResponse.sort((a, b) => b.credits - a.credits);
  }
  return filteredResponse;
};

const SearchPage = () => {
  // will set text to search courses
  const [searchText, setSearchText] = useState<string>('');

  // will set data to filter courses
  const [filterObj, setFilterObj] = useState<filterObjType>(getInitialValue2());

  // to dispatch action for api call
  const dispatch: AppDispatch = useDispatch();

  // will get most popular course data
  const { mostPopularCourses } = useSelector(
    (state: RootState) => state?.marketplace
  );

  // will get searched courses data
  const { searchCourses } = useSelector(
    (state: RootState) => state?.searchCourses
  );

  // this method will apply filter to fetched data
  const coursesList = filterData(searchCourses, filterObj);

  // will show popular courses initial when true
  const [showMostPopularCourses, setShowMostPopularCourses] =
    useState<boolean>(true);

  // will show filter input fields if true
  const [isFilterOpen, setFilterOpen] = useState(false);

  // will show filters list in ui
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  // will set all filters applied eg '1 language' '2 course provider' etc
  const SearchFilterOptions = () => {
    const { competencies, courseProviders, language, sortBy } = filterObj;
    setSelectedOption([]);
    if (competencies) setSelectedOption((prev) => [...prev, competencies]);
    if (courseProviders?.length)
      setSelectedOption((prev) => [
        ...prev,
        `${courseProviders?.length} course provider`,
      ]);
    if (language?.length)
      setSelectedOption((prev) => [...prev, `${language.length} language`]);
    if (sortBy) {
      setSelectedOption((prev) => [...prev, sortBy]);
    }
  };

  // will fetch data and hide popular courses
  const handleSearchCourse = async () => {
    if (searchText) {
      dispatch(getSearchCourses(searchText));
      setShowMostPopularCourses(false);
    } else {
      toast.error('please enter course name', {
        draggable: false,
      });
    }
  };

  // will remove search field
  const handleCrossIcon = () => {
    setShowMostPopularCourses(true);
    setSearchText('');
  };

  // will remove filters and set the filters to null
  const handleDeleteSelectedOption = (indexToRemove: number) => {
    const updatedOptions = [...selectedOption];
    const removeFilter = updatedOptions.splice(indexToRemove, 1);
    if (removeFilter?.join()?.includes('High Price' || 'Low Price')) {
      setFilterObj((pre) => {
        return {
          ...pre,
          sortBy: '',
        };
      });
    } else if (removeFilter?.join()?.includes('language')) {
      setFilterObj((pre) => {
        return {
          ...pre,
          language: null,
        };
      });
    } else if (removeFilter?.join()?.includes('provider')) {
      setFilterObj((pre) => {
        return {
          ...pre,
          courseProviders: null,
        };
      });
    } else {
      setFilterObj((pre) => {
        return {
          ...pre,
          competencies: '',
        };
      });
    }
    setSelectedOption(updatedOptions);
  };

  // filter input fields
  if (isFilterOpen) {
    return (
      <FilterPage
        filterObj={filterObj}
        setFilterObj={setFilterObj}
        setFilterOpen={setFilterOpen}
        SearchFilterOptions={SearchFilterOptions}
        handleFilterCourse={handleSearchCourse}
      />
    );
  }

  return (
    <div className='mx-[16px] mb-[30px]'>
      <SearchTopbar title='Search' redirectTo='/marketplace' />
      <SearchInput
        value={searchText}
        onChange={setSearchText}
        placeholder='Search your course...'
        handleClick={handleSearchCourse}
        selectedOptionCount={selectedOption.length}
        handleCrossIcon={handleCrossIcon}
        handleFilterIcon={() => setFilterOpen(true)}
      />
      {selectedOption?.length != 0 && (
        <div className='my-5 flex flex-wrap items-center gap-2'>
          <p className='text-[14px] font-medium leading-6 '>Filtered by:</p>
          {selectedOption?.map((option, index) => {
            return (
              <div
                key={index}
                className='inline-flex items-center justify-center gap-2 rounded-full bg-[#F4F8FF] px-2 py-1'
              >
                <p>{option}</p>
                <RxCross1
                  size='12'
                  onClick={() => handleDeleteSelectedOption(index)}
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
      ) : coursesList?.length != 0 ? (
        <div>
          <div className='mt-5  px-5 py-4'>
            <Heading heading='Related Results' />
          </div>
          <div className='flex flex-col gap-5 px-4'>
            {coursesList?.map((course: CourseType, index: number) => {
              return <CourseCard key={index} courseDetails={course} />;
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
