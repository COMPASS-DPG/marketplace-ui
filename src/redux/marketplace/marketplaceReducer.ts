import {
  MARKETPLACE_FAILURE,
  MARKETPLACE_REQUEST,
  MARKETPLACE_SUCCESS,
} from './type';

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
  numberOfPurchases: number;
};

const init = {
  mostPopularCourses: null,
  recommendedCourses: null,
  savedCourses: null,
  ongoingCourses: null,
  isLoading: false,
  isError: false,
};

type actionType = {
  type: string;
  payload: {
    mostPopularCourses: CourseType[];
    recommendedCourses: CourseType[];
    savedCourses: CourseType[];
    ongoingCourses: CourseType[];
  };
};

export const marketplaceReducer = (
  state = init,
  { type, payload }: actionType
) => {
  switch (type) {
    case MARKETPLACE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case MARKETPLACE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        mostPopularCourses: payload.mostPopularCourses,
        recommendedCourses: payload.recommendedCourses,
        savedCourses: payload.savedCourses,
        ongoingCourses: payload.ongoingCourses,
      };
    }
    case MARKETPLACE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
