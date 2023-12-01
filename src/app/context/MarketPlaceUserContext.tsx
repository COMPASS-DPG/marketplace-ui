'use client';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getongoingCoursess,
  getSavedCourse,
} from '@/services/marketplaceServices';

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
      providerName: 'learning',
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
      language: ['English', 'Canada'],
      imageLink: '../../../public/images/courseImage.png',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuNemo enim ipsam voluptatem quia volupta sit aspernatur aut odit aut fugit, sunt in culpa qui officia deserunt mollit anim id essed quia consequuntur maExcepteur sint occaecat  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      author: 'dummyAuthore',
      providerName: 'CourseEra',
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
      providerName: 'Udemy',
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
  author?: string;
  courseLink?: string;
  bppId?: string;
  providerId?: string;
  providerName?: string;
};

interface WpcasContextValue {
  savedCourses: CourseType[];
  mostPopularCourses: CourseType[];
  recommendedCourses: CourseType[];
  ongoingCourses: CourseType[];
  loading: boolean;
  error: boolean;
  setsavedCourses: (arg: CourseType[]) => void;
}

const MarketPlaceUserProvider = createContext<WpcasContextValue>({
  savedCourses: [],
  mostPopularCourses: [],
  recommendedCourses: [],
  ongoingCourses: [],
  loading: true,
  error: false,
  setsavedCourses: () => null,
});

const MarketPlaceUserContext = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const router = useRouter();
  const userId = localStorage.getItem('userId') ?? '';
  const [savedCourses, setsavedCourses] = useState<CourseType[]>([]);
  const [mostPopularCourses, setmostPopularCourses] = useState<CourseType[]>(
    []
  );
  const [recommendedCourses, setrecommendedCoursess] = useState<CourseType[]>(
    []
  );
  const [ongoingCourses, setOngoingCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAllCourse = useCallback(async () => {
    try {
      const response = await getSavedCourse(userId);
      // const response2 = await getmostPopularCourses(userId);
      // const response3 = await getrecommendedCoursess(userId);
      const response4 = await getongoingCoursess(userId);
      const ongoingCoursesInfo = response4.map(
        (item: { CourseInfo: CourseType }) => item.CourseInfo
      );

      setLoading(false);
      setsavedCourses(response);
      setmostPopularCourses(getInitialValue());
      setrecommendedCoursess(getInitialValue());
      setOngoingCourses(ongoingCoursesInfo);

      router.push('/marketplace');
    } catch (error) {
      router.push('/error');
      setLoading(false);
      setError(true);
    }
  }, [userId, router]);

  useEffect(() => {
    fetchAllCourse();
  }, [fetchAllCourse]);

  return (
    <MarketPlaceUserProvider.Provider
      value={{
        savedCourses,
        mostPopularCourses,
        recommendedCourses,
        ongoingCourses,
        loading,
        error,
        setsavedCourses,
      }}
    >
      {children}
    </MarketPlaceUserProvider.Provider>
  );
};

export const useMarketPlaceContext = () => useContext(MarketPlaceUserProvider);
export default MarketPlaceUserContext;
