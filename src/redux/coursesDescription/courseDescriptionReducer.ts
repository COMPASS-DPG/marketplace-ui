import {
  GET_SAVE_COURSE_AND_STATUS_FAILURE,
  GET_SAVE_COURSE_AND_STATUS_REQUEST,
  GET_SAVE_COURSE_AND_STATUS_SUCCESS,
  SAVE_COURSE_FAILURE,
  SAVE_COURSE_REQUEST,
  SAVE_COURSE_SUCCESS,
  UNSAVE_COURSE_FAILURE,
  UNSAVE_COURSE_REQUEST,
  UNSAVE_COURSE_SUCCESS,
} from './type';
import { CourseType } from '../marketplace/marketplaceReducer';

const init = {
  status: null,
  singleCourse: null,
  isLoading: false,
  isError: false,
};

type actionType = {
  type: string;
  payload: {
    status: boolean;
    singleCourse: CourseType;
  };
};

export const courseDescriptionReducer = (
  state = init,
  { type, payload }: actionType
) => {
  switch (type) {
    case GET_SAVE_COURSE_AND_STATUS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_SAVE_COURSE_AND_STATUS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: payload.status,
        singleCourse: payload.singleCourse,
      };
    }
    case GET_SAVE_COURSE_AND_STATUS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case SAVE_COURSE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SAVE_COURSE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SAVE_COURSE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case UNSAVE_COURSE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UNSAVE_COURSE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UNSAVE_COURSE_FAILURE: {
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
