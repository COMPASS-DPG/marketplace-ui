'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getSavedCourse } from '@/services/marketplaceServices';

export const getInitialValue = (): CourseType[] => {
  return [
    {
      courseId: 1,
      title: 'Introduction to Programming',
      competency: {
        'Pregnancy Identification': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
        'Pregnancy Identification 2': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
        'Pregnancy Identification 3': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
      },
      created_by: 'Author 1',
      avgRating: 4,
      credits: 100,
      language: ['One', 'Two', 'Three'],
      imageLink: '../../../public/images/courseImage.png',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuNemo enim ipsam voluptatem quia volupta sit aspernatur aut odit aut fugit, sunt in culpa qui officia deserunt mollit anim id essed quia consequuntur maExcepteur sint occaecat  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      author: 'dummyAuthore',
      lastUpdatedOn: '24-aug-2024',
    },
    {
      courseId: 2,
      title: 'Web Development Basics',
      competency: {
        'Pregnancy Identification': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
        'Pregnancy Identification 2': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
        'Pregnancy Identification 3': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
      },
      created_by: 'Author 2',
      avgRating: 3,
      credits: 100,
      language: ['One', 'Three'],
      imageLink: '../../../public/images/courseImage.png',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuNemo enim ipsam voluptatem quia volupta sit aspernatur aut odit aut fugit, sunt in culpa qui officia deserunt mollit anim id essed quia consequuntur maExcepteur sint occaecat  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      author: 'dummyAuthore',
      lastUpdatedOn: '24-aug-2024',
    },
    {
      courseId: 3,
      title: 'Data Science Fundamentals',
      competency: {
        'Pregnancy Identification': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
        'Pregnancy Identification 2': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
        'Pregnancy Identification 3': [
          'Understands health of males and females and initial assessment protocols',
          'Identifies pregnancy using Nischaya Kit',
        ],
      },
      created_by: 'Author 3',
      avgRating: 5,
      credits: 100,
      language: ['Two', 'Three'],
      imageLink: '../../../public/images/courseImage.png',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuNemo enim ipsam voluptatem quia volupta sit aspernatur aut odit aut fugit, sunt in culpa qui officia deserunt mollit anim id essed quia consequuntur maExcepteur sint occaecat  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      author: 'dummyAuthore',
      lastUpdatedOn: '24-aug-2024',
    },
  ];
};

export type CourseType = {
  courseId: number;
  title: string;
  competency: {
    [key: string]: string[];
  };
  created_by: string;
  lastUpdatedOn: string;
  avgRating: number;
  credits: number;
  language: string[];
  imageLink: string;
  description: string;
  author: string;
};

interface WpcasContextValue {
  savedCourses: CourseType[];
  mostPopularCourses: CourseType[];
  recommendedCourses: CourseType[];
}

const MarketPlaceUserProvider = createContext<WpcasContextValue>({
  savedCourses: [],
  mostPopularCourses: [],
  recommendedCourses: [],
});

const MarketPlaceUserContext = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [savedCourses, setsavedCourses] = useState<CourseType[]>([]);
  const [mostPopularCourses, setmostPopularCourses] = useState<CourseType[]>(
    []
  );
  const [recommendedCourses, setrecommendedCoursess] = useState<CourseType[]>(
    []
  );
  const userId = '123e4567-e89b-42d3-a456-556642440000';

  const fetchAllCourse = async () => {
    try {
      const response = await getSavedCourse(userId);
      // const response2 = await getmostPopularCourses(userId);
      // const response3 = await getrecommendedCoursess(userId);
      setsavedCourses(response);
      setmostPopularCourses(getInitialValue());
      setrecommendedCoursess(getInitialValue());
    } catch (error) {
      toast.error('something went wrong');
    }
  };
  useEffect(() => {
    fetchAllCourse();
  }, []);

  return (
    <MarketPlaceUserProvider.Provider
      value={{ savedCourses, mostPopularCourses, recommendedCourses }}
    >
      {children}
    </MarketPlaceUserProvider.Provider>
  );
};

export const useMarketPlaceContext = () => useContext(MarketPlaceUserProvider);
export default MarketPlaceUserContext;
