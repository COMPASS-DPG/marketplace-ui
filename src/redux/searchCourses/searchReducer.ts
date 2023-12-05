import {
  SEARCH_COURSES_FAILURE,
  SEARCH_COURSES_REQUEST,
  SEARCH_COURSES_RESET,
  SEARCH_COURSES_SUCCESS,
} from './type';
import { CourseType } from '../marketplace/marketplaceReducer';

const init = {
  searchCourses: [],
  isLoading: false,
  isError: false,
};

type actionType = {
  type: string;
  payload: CourseType[];
};

export const searchCoursesReducer = (
  state = init,
  { type, payload }: actionType
) => {
  switch (type) {
    case SEARCH_COURSES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SEARCH_COURSES_RESET: {
      return {
        ...state,
        isLoading: false,
        searchCourses: [],
      };
    }
    case SEARCH_COURSES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        searchCourses: [...state.searchCourses, ...payload],
      };
    }
    case SEARCH_COURSES_FAILURE: {
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
